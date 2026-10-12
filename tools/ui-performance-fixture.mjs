import {readFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

export function createPerformanceFixture({catalog = null, delay = 80, previewImages = new Map()} = {}) {
  const fixture = {requests: [], rejectedSession: false, failLike: false, failVariants: false, historyVersion: 0};
  const items = catalog?.items?.map(item => previewImages.has(item.id)
    ? {...item, preview_image_url: `/__performance-cached/${encodeURIComponent(item.id)}`}
    : {...item}) || Array.from({length: 120}, (_, index) => ({
    id: `20261012-template-${index}`, title: `Портрет ${index + 1}`, category: `Категория ${Math.floor(index / 10) + 1}`,
    created_at: new Date(Date.UTC(2026, 9, 12, 0, 0, 120 - index)).toISOString(),
    preview_image_url: `/__performance-media/${index}_preview.jpg`, full_image_url: `/__performance-media/${index}_full.jpg`,
    preview_width: 1200, preview_height: 1200, likes_count: 0, liked_by_me: false,
    preview_image_variants: index === 1 ? [] : [
      {url: `/__performance-media/${index}_preview_480.webp`, width: 480, height: 480},
      {url: `/__performance-media/${index}_preview_768.webp`, width: 768, height: 768},
    ],
  }));
  const user = {id: '11111111-1111-4111-8111-111111111111', display_name: 'Тест', is_admin: false,
    has_successful_payment: true, successful_generation_count: 24};
  fixture.items = items;
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://127.0.0.1');
      fixture.requests.push({path: url.pathname, method: request.method, search: url.search});
      if (url.pathname === '/healthz' || url.pathname.startsWith('/v1/')) {
        request.resume();
        await sleep(delay);
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Cache-Control', 'no-store');
        if (fixture.rejectedSession && ['/v1/me', '/v1/wallet', '/v1/auth/refresh', '/v1/account/identities'].includes(url.pathname)) {
          response.writeHead(401).end(JSON.stringify({detail: {code: 'invalid_token', message: 'Test session expired'}})); return;
        }
        let payload = {items: [], ok: true};
        if (url.pathname === '/healthz') payload = {status: 'ok'};
        if (url.pathname === '/v1/me') payload = user;
        if (url.pathname === '/v1/wallet') payload = {balance_credits: 100};
        if (url.pathname === '/v1/account/identities') payload = {providers: ['telegram'], linked_telegram: true};
        if (url.pathname === '/v1/referrals/me') payload = {reward_credits: 20, rewarded_count: 0};
        if (url.pathname === '/v1/first-photoset-offer/state') payload = {eligible: false, status: 'not_started'};
        if (url.pathname === '/v1/plans') payload = {topups: [{code: 'start', title: 'Старт', price_rub: 220, credits: 100}]};
        if (url.pathname === '/v1/me/looks') payload = {items: [], max_looks: 5, max_photos: 3, selection: null};
        if (url.pathname === '/v1/templates') payload = {items: items.map(item => ({...item, liked_by_me: !fixture.rejectedSession && item.liked_by_me}))};
        if (url.pathname.startsWith('/v1/templates/')) {
          const id = decodeURIComponent(url.pathname.split('/')[3]);
          const item = items.find(candidate => candidate.id === id);
          if (!item) {response.writeHead(404).end('{}'); return;}
          if (url.pathname.endsWith('/like')) {
            if (fixture.failLike) {
              fixture.failLike = false;
              response.writeHead(503).end(JSON.stringify({detail: {code: 'test_failure', message: 'Test like unavailable'}})); return;
            }
            item.liked_by_me = request.method === 'POST';
            item.likes_count = item.liked_by_me ? 1 : 0;
            payload = {template_id: id, likes_count: item.likes_count, liked_by_me: item.liked_by_me};
          } else payload = {...item, prompt: 'Preserve the person identity. A photographic portrait in natural light.'};
        }
        if (url.pathname === '/v1/generations') {
          const offset = Number(url.searchParams.get('offset') || 0);
          payload = {items: Array.from({length: 12}, (_, index) => ({
            id: `22222222-2222-4222-8222-${String(index + offset + 1).padStart(12, '0')}`,
            status: 'done', prompt: `Portrait ${index + offset + 1}`, is_edit: true,
            provider_model: 'gemini-3.1-flash-image-preview', requested_credits: 10, output_size: '1024x1024',
            result_image_url: `/__performance-media/result-${index + offset}_full.jpg?signature=${fixture.historyVersion}`,
            result_image_thumbnail_url: `/__performance-media/result-${index + offset}_preview.jpg?signature=${fixture.historyVersion}`,
          })), has_more: offset === 0, next_offset: offset === 0 ? 12 : null};
        }
        if (request.method === 'POST' && url.pathname.startsWith('/v1/generations')) {
          response.writeHead(400).end(JSON.stringify({detail: {code: 'preview_only', message: 'Local preview does not generate images'}})); return;
        }
        response.end(JSON.stringify(payload)); return;
      }
      if (url.pathname.startsWith('/__performance-cached/')) {
        const content = previewImages.get(decodeURIComponent(url.pathname.split('/').pop()));
        if (!content) {response.writeHead(404).end(); return;}
        response.setHeader('Content-Type', 'image/jpeg');
        response.setHeader('Cache-Control', 'public, max-age=3600');
        response.end(content); return;
      }
      if (url.pathname.startsWith('/__performance-media/')) {
        if (url.pathname.includes('_full.') && fixture.mediaDelay) await sleep(fixture.mediaDelay);
        if (fixture.failVariants && url.pathname.endsWith('.webp')) {response.writeHead(404).end(); return;}
        response.setHeader('Content-Type', 'image/jpeg');
        response.setHeader('Cache-Control', 'public, max-age=3600');
        response.end(await readFile(path.join(root, 'app/assets/reference/reference-prompt-roses.jpg'))); return;
      }
      const pathname = url.pathname.endsWith('/') ? url.pathname + 'index.html' : url.pathname;
      const file = path.resolve(root, '.' + decodeURIComponent(pathname));
      if (!file.startsWith(root + path.sep)) {response.writeHead(403).end(); return;}
      const types = {'.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2'};
      let content = await readFile(file);
      if (file === path.join(root, 'app/index.html')) {
        const init = `<script>localStorage.setItem('kartivio.last_auth_provider','telegram');localStorage.setItem('kartivio.api_base',location.origin);localStorage.setItem('kartivio.product_analytics_disabled','1');</script>`;
        content = Buffer.from(content.toString().replace('</head>', init + '</head>'));
      }
      response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
      response.setHeader('Cache-Control', 'no-store');
      response.end(content);
    } catch {
      if (!response.headersSent) response.writeHead(404);
      response.end();
    }
  });
  return {server, fixture};
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const option = name => process.argv[process.argv.indexOf(name) + 1];
  const catalog = process.argv.includes('--catalog') ? JSON.parse(await readFile(option('--catalog'), 'utf8')) : null;
  const previewImages = new Map();
  if (process.argv.includes('--image-cache')) {
    const directory = option('--image-cache');
    const metadata = JSON.parse(await readFile(path.join(directory, 'results.json'), 'utf8'));
    for (const sample of metadata.samples) {
      if (sample.id && !sample.error) previewImages.set(sample.id, await readFile(path.join(directory, `preview-${sample.index}.jpg`)));
    }
  }
  const {server} = createPerformanceFixture({catalog, previewImages});
  server.listen(Number(process.argv.includes('--port') ? option('--port') : 8089), '127.0.0.1', () => {
    console.log(`Local fixture preview: http://127.0.0.1:${server.address().port}/app/`);
  });
}
