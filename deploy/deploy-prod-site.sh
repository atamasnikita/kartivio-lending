#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

SITE_HOST="${KARTIVIO_SITE_HOST:-85.235.205.239}"
SITE_USER="${KARTIVIO_SITE_USER:-root}"
SITE_ROOT="${KARTIVIO_SITE_ROOT:-/var/www/kartivio-ai.ru/current}"
SITE_RELEASE_DIR="$(dirname "$SITE_ROOT")"
SITE_NGINX_CONF="${KARTIVIO_SITE_NGINX_CONF:-/etc/nginx/sites-available/kartivio-ai.ru.conf}"
SITE_NGINX_ENABLED="${KARTIVIO_SITE_NGINX_ENABLED:-/etc/nginx/sites-enabled/kartivio-ai.ru.conf}"
SITE_IDENTITY_FILE="${KARTIVIO_SITE_IDENTITY_FILE:-}"

require_bin() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required binary: $1" >&2
    exit 1
  fi
}

require_bin rsync
require_bin ssh

ssh_base_args=(-o StrictHostKeyChecking=no)
if [[ -n "$SITE_IDENTITY_FILE" ]]; then
  ssh_base_args+=(-o IdentitiesOnly=yes -o PreferredAuthentications=publickey -i "$SITE_IDENTITY_FILE")
fi

ssh_remote() {
  ssh "${ssh_base_args[@]}" "$SITE_USER@$SITE_HOST" "$@"
}

rsync_remote() {
  rsync -az --delete --rsh="ssh ${ssh_base_args[*]}" "$@"
}

echo "==> Create site directories"
ssh_remote "mkdir -p '$SITE_ROOT' '$SITE_RELEASE_DIR'"

echo "==> Sync static site"
rsync_remote \
  --exclude ".git" \
  --exclude ".DS_Store" \
  --exclude "tmp" \
  --exclude "deploy" \
  --exclude ".gitignore" \
  "$REPO_ROOT/" \
  "$SITE_USER@$SITE_HOST:$SITE_ROOT/"

echo "==> Install nginx config"
rsync_remote \
  "$REPO_ROOT/deploy/nginx/kartivio-site.http.conf" \
  "$SITE_USER@$SITE_HOST:$SITE_NGINX_CONF"

echo "==> Enable site"
ssh_remote "
  ln -sfn '$SITE_NGINX_CONF' '$SITE_NGINX_ENABLED' &&
  nginx -t &&
  systemctl reload nginx
"

echo "==> Smoke check via host header"
curl -fsS --resolve kartivio-ai.ru:443:$SITE_HOST https://kartivio-ai.ru/ >/dev/null
curl -fsS --resolve kartivio-ai.ru:443:$SITE_HOST https://kartivio-ai.ru/app/ | grep -q 'app.js?v='

echo
echo "Site staged on $SITE_HOST."
echo "Static site deploy completed on $SITE_HOST."
