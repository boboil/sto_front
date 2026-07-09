#!/bin/bash
# Deploy cabinet.sto.sumy.ua: pull master, install deps, rebuild static site into dist/ (served by nginx).
# Run on the prod server as root: bash deploy.sh
set -e

export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use 14 >/dev/null

cd /var/www/cabinet_sto__usr/data/www/cabinet.sto.sumy.ua
git pull origin master
yarn install --frozen-lockfile
yarn generate

echo "Deployed $(git rev-parse --short HEAD) at $(date)"
