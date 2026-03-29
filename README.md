# Zitadel Login

This repo exists to produce a customized Zitadel Login docker container that is generic enough for general use.

## Configuration
The following env-vars are available to set links in the footer

#### Left hand side footer links
* `NEXT_PUBLIC_FOOTER_L1_URL` & `NEXT_PUBLIC_FOOTER_L1_TEXT`
* `NEXT_PUBLIC_FOOTER_L2_URL` & `NEXT_PUBLIC_FOOTER_L2_TEXT`
* `NEXT_PUBLIC_FOOTER_L3_URL` & `NEXT_PUBLIC_FOOTER_L3_TEXT`

#### Right hand side footer links
* `NEXT_PUBLIC_FOOTER_R1_URL` & `NEXT_PUBLIC_FOOTER_R1_TEXT`
* `NEXT_PUBLIC_FOOTER_R2_URL` & `NEXT_PUBLIC_FOOTER_R2_TEXT`

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
