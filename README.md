# Zitadel Login

This repo produces a customized Zitadel Login docker container, generic enough for general use.

It is a sparse-checkout fork of [zitadel/zitadel](https://github.com/zitadel/zitadel).

## Branch Strategy

- **`psaintel`**: The active customization branch containing all our custom modifications. It tracks upstream releases by rebasing on top of the pinned upstream tag.

## Configuration

The following env-vars set links in the login page footer.

#### Left hand side footer links
* `NEXT_PUBLIC_FOOTER_L1_URL` & `NEXT_PUBLIC_FOOTER_L1_TEXT`
* `NEXT_PUBLIC_FOOTER_L2_URL` & `NEXT_PUBLIC_FOOTER_L2_TEXT`
* `NEXT_PUBLIC_FOOTER_L3_URL` & `NEXT_PUBLIC_FOOTER_L3_TEXT`

#### Right hand side footer links
* `NEXT_PUBLIC_FOOTER_R1_URL` & `NEXT_PUBLIC_FOOTER_R1_TEXT`
* `NEXT_PUBLIC_FOOTER_R2_URL` & `NEXT_PUBLIC_FOOTER_R2_TEXT`

## Development Docker
```shell
# NB: from the root of the repo!
docker compose -f docker-compose-dev.yml up
```

## Docker Build
```shell
docker build -t zitadel-login-$(date -u +%Y%m%dz%H%M%S) -f apps/login/Dockerfile .
```

---

## Upstream Synchronization Workflow

Our custom commits live directly on the `psaintel` branch as a linear sequence of commits on top of a pinned upstream release tag (e.g., `v4.15.1`).

Detailed instructions for upgrading the base tag, rebasing, resolving conflicts, and regenerating the lockfile are documented in:
- **[Upstream Synchronization Workflow](file:///home/ndejong/cyberco/projects/psaintelligence-platform/zitadel-login/.agent/workflows/upstream-sync.md)**
