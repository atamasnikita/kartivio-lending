#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";

const API_BASE_URL = "https://searchapi.api.cloud.yandex.net/v2/wordstat";
const DEFAULT_REGION = "225"; // Russia in Yandex geobase.
const DEFAULT_DEVICE = "DEVICE_ALL";

const COMMANDS = new Set(["top", "regions", "dynamics"]);

function usage() {
  console.log(`Usage:
  YANDEX_SEARCH_API_KEY=... node tools/wordstat.mjs top "ии фотосессия" "нейросеть по фото" --limit 10
  YANDEX_SEARCH_API_KEY=... node tools/wordstat.mjs regions "ии фотосессия"
  YANDEX_SEARCH_API_KEY=... node tools/wordstat.mjs dynamics "ии фотосессия" --from 2026-01-01 --to 2026-08-31
  YANDEX_SEARCH_API_KEY=... node tools/wordstat.mjs top --file docs/seeds.txt --output docs/results.json --format json

Options:
  --limit <n>       Number of phrases for top requests. Default: 10
  --regions <ids>   Comma-separated Yandex region ids. Default: 225
  --devices <ids>   Comma-separated devices. Default: DEVICE_ALL
  --from <date>     Dynamics start date, YYYY-MM-DD. Default: 2026-01-01
  --to <date>       Dynamics end date, YYYY-MM-DD. Default: 2026-08-31
  --period <enum>   Dynamics period. Default: PERIOD_MONTHLY
  --file <path>     Read phrases from a newline-separated file
  --output <path>   Write batch output to a file
  --format <fmt>    Output format: text, json, tsv. Default: text
  --delay-ms <n>    Delay between batch requests. Default: 150

Optional env:
  YANDEX_SEARCH_FOLDER_ID  Included as folderId when set.`);
}

function parseArgs(argv) {
  const command = argv[0];
  if (!COMMANDS.has(command)) {
    usage();
    process.exit(command ? 1 : 0);
  }

  const phrases = [];
  const options = {
    limit: 10,
    regions: [DEFAULT_REGION],
    devices: [DEFAULT_DEVICE],
    from: "2026-01-01",
    to: "2026-08-31",
    period: "PERIOD_MONTHLY",
    file: null,
    output: null,
    format: "text",
    delayMs: 150,
  };

  for (let index = 1; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      phrases.push(token);
      continue;
    }

    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      throw new Error(`Option ${token} requires a value.`);
    }
    index += 1;

    if (token === "--limit") {
      options.limit = Number.parseInt(next, 10);
    } else if (token === "--regions") {
      options.regions = splitCsv(next);
    } else if (token === "--devices") {
      options.devices = splitCsv(next);
    } else if (token === "--from") {
      options.from = next;
    } else if (token === "--to") {
      options.to = next;
    } else if (token === "--period") {
      options.period = next;
    } else if (token === "--file") {
      options.file = next;
    } else if (token === "--output") {
      options.output = next;
    } else if (token === "--format") {
      options.format = next;
    } else if (token === "--delay-ms") {
      options.delayMs = Number.parseInt(next, 10);
    } else {
      throw new Error(`Unknown option: ${token}`);
    }
  }

  if (phrases.length === 0 && !options.file) {
    throw new Error("Add at least one phrase.");
  }
  if (!Number.isInteger(options.limit) || options.limit < 1 || options.limit > 100) {
    throw new Error("--limit must be an integer from 1 to 100.");
  }
  if (!["text", "json", "tsv"].includes(options.format)) {
    throw new Error("--format must be one of: text, json, tsv.");
  }
  if (!Number.isInteger(options.delayMs) || options.delayMs < 0) {
    throw new Error("--delay-ms must be a non-negative integer.");
  }

  return { command, phrases, options };
}

async function loadPhrases(options, cliPhrases) {
  const phrases = [...cliPhrases];
  if (options.file) {
    const content = await readFile(options.file, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const phrase = line.trim();
      if (!phrase || phrase.startsWith("#")) {
        continue;
      }
      phrases.push(phrase);
    }
  }

  return [...new Set(phrases)];
}

function splitCsv(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toIsoDate(value) {
  return `${value}T00:00:00Z`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildBody(command, phrase, options) {
  const folderId = process.env.YANDEX_SEARCH_FOLDER_ID?.trim();
  const body = {
    phrase,
    regions: options.regions,
    devices: options.devices,
  };

  if (folderId) {
    body.folderId = folderId;
  }

  if (command === "top") {
    body.numPhrases = options.limit;
  }
  if (command === "dynamics") {
    body.period = options.period;
    body.fromDate = toIsoDate(options.from);
    body.toDate = toIsoDate(options.to);
  }

  return body;
}

async function requestWordstat(command, body) {
  const apiKey = process.env.YANDEX_SEARCH_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("Set YANDEX_SEARCH_API_KEY before running the script.");
  }

  const endpoint = command === "top" ? "topRequests" : command;
  let response;
  let text;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Api-key ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    text = await response.text();
    if (response.status !== 429 || attempt === 3) {
      break;
    }
    await sleep(1000 * (attempt + 1));
  }

  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(data)}`);
  }

  return data;
}

function topRows(phrase, data) {
  return (data.results ?? []).map((item) => ({
    seed: phrase,
    phrase: item.phrase,
    count: Number(item.count ?? 0),
    source: "result",
  }));
}

function associationRows(phrase, data) {
  return (data.associations ?? []).map((item) => ({
    seed: phrase,
    phrase: item.phrase,
    count: Number(item.count ?? 0),
    source: "association",
  }));
}

function toTsv(results, command) {
  const rows = [["seed", "source", "phrase", "count"]];
  for (const item of results) {
    if (item.error) {
      rows.push([item.phrase, "error", item.error, ""]);
      continue;
    }
    if (command === "top") {
      for (const row of [...topRows(item.phrase, item.data), ...associationRows(item.phrase, item.data)]) {
        rows.push([row.seed, row.source, row.phrase, String(row.count)]);
      }
    }
  }
  return rows.map((row) => row.map((cell) => String(cell).replaceAll("\t", " ")).join("\t")).join("\n");
}

function printBatchText(command, results) {
  for (const item of results) {
    if (item.error) {
      console.log(`\n## ${item.phrase}\nERROR\t${item.error}`);
      continue;
    }
    if (command === "top") {
      printTop(item.phrase, item.data);
    } else if (command === "regions") {
      printRegions(item.phrase, item.data);
    } else {
      printDynamics(item.phrase, item.data);
    }
  }
}

function printTop(phrase, data) {
  console.log(`\n## ${phrase}`);
  console.log(`total\t${data.totalCount ?? "n/a"}`);
  for (const item of data.results ?? []) {
    console.log(`${item.count}\t${item.phrase}`);
  }
  if (data.associations?.length) {
    console.log("associations");
    for (const item of data.associations) {
      console.log(`${item.count}\t${item.phrase}`);
    }
  }
}

function printRegions(phrase, data) {
  console.log(`\n## ${phrase}`);
  for (const item of data.results ?? []) {
    console.log(`${item.count}\tregion:${item.region}\tshare:${item.share}\taffinity:${item.affinityIndex}`);
  }
}

function printDynamics(phrase, data) {
  console.log(`\n## ${phrase}`);
  for (const item of data.results ?? []) {
    console.log(`${item.date.slice(0, 10)}\t${item.count}\tshare:${item.share}`);
  }
}

async function main() {
  const { command, phrases, options } = parseArgs(process.argv.slice(2));
  const allPhrases = await loadPhrases(options, phrases);
  const results = [];

  for (const [index, phrase] of allPhrases.entries()) {
    try {
      const data = await requestWordstat(command, buildBody(command, phrase, options));
      results.push({ phrase, data });
    } catch (error) {
      results.push({ phrase, error: error.message });
    }

    if (options.output) {
      process.stderr.write(`wordstat ${index + 1}/${allPhrases.length}: ${phrase}\n`);
    }
    if (index < allPhrases.length - 1 && options.delayMs > 0) {
      await sleep(options.delayMs);
    }
  }

  let output;
  if (options.format === "json") {
    output = `${JSON.stringify(results, null, 2)}\n`;
  } else if (options.format === "tsv") {
    output = `${toTsv(results, command)}\n`;
  }

  if (options.output) {
    await writeFile(options.output, output ?? "", "utf8");
    if (!output) {
      await writeFile(options.output, JSON.stringify(results, null, 2), "utf8");
    }
    return;
  }

  if (output) {
    process.stdout.write(output);
  } else {
    printBatchText(command, results);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
