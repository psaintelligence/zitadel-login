# Zitadel Login

This repo exists to produce a customized Zitadel Login docker container that is generic enough for general use.

## Configuration
Set the following env-vars at container run-time to enable "Terms of Service" and "Privacy Policy" links
* `NEXT_PUBLIC_TOS_URL`
* `NEXT_PUBLIC_PRIVACY_URL`

## Developers
```shell
# clone the repo that is a fork from https://github.com/zitadel/zitadel
git clone https://github.com/psaintelligence/zitadel-login
cd zitadel-login

# sparse checkout the login app
git sparse-checkout init --cone
git sparse-checkout set .github apps proto packages custom

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
