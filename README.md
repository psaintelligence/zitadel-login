# Zitadel Login

This repo exists for a customized Zitadel Login docker container

## Developers
```shell
# clone the repo that is a fork from https://github.com/zitadel/zitadel
git clone https://github.com/ndejong-psaintelligence/zitadel-login
cd zitadel-login

# sparse checkout the login app
git sparse-checkout init --cone
git sparse-checkout set apps/login packages/shared
git sparse-checkout add apps
git sparse-checkout add proto
git sparse-checkout add packages
git sparse-checkout add .github

# track upstream
git branch upstream
git checkout upstream
git remote add upstream https://github.com/zitadel/zitadel.git
git fetch upstream
git merge upstream/main
```

## Development Docker
```shell
# NB: from the root of the repo!
docker compose -f docker-compose-dev.yml up
```

## Docker Build
```shell
docker build -t zitadel-login-$(date -u +%Y%m%dz%H%M%S) -f apps/login/Dockerfile .
```
