# Upstream Synchronization Workflow

This document describes how to track upstream releases and upgrade the base ZITADEL version.

## Architecture

Our custom commits live directly on the `psaintel` branch as a linear sequence of commits on top of a pinned upstream release tag (e.g., `v4.15.1`).

```
              v4.15.1 (Upstream Tag)
                 │
                 ├──► Commit 1: build/compose customizations
                 ├──► Commit 2: theme settings
                 └──► Commit 3: footer links
```

---

## Workflow: Upgrading Upstream Base Tag

To upgrade the base ZITADEL release (e.g., from `v4.15.1` to `v4.16.0`):

### 1. Fetch Upstream Tags
Fetch the latest tags from the upstream repository:
```bash
git fetch upstream --tags
```

### 2. Rebase `psaintel` onto the New Tag
Assume the old tag is `v4.15.1` and the new tag is `v4.16.0`:
```bash
git rebase --onto v4.16.0 v4.15.1 psaintel
```

### 3. Resolve Conflicts (if any)
If conflicts occur, resolve them in the working tree, stage the resolved files, and continue the rebase:
```bash
# Add resolved files
git add <file-with-conflict>

# Continue rebase
git rebase --continue
```

### 4. Regenerate Lockfile Inside Docker
Since dependencies or versions may have changed, spin up the development container and run `pnpm install` inside the container to regenerate the lockfile cleanly:
```bash
# Start container in background
docker compose -f docker-compose-dev.yml up -d

# Run pnpm install inside the container
docker exec zitadel-login-dev sh -c "cd /app && corepack enable && pnpm install --filter ./apps/login..."

# Stop the container
docker compose -f docker-compose-dev.yml down
```

### 5. Commit the Updated Lockfile
If the lockfile was modified, amend the last commit (or commit as a new fix/chore):
```bash
git add pnpm-lock.yaml
git commit --amend --no-edit
```

### 6. Force-Push to Origin
Since history above the tag was rewritten, force-pushing the branch is required:
```bash
git push origin psaintel --force-with-lease
```

---

## Adding a New Customization

To add a new feature or theme setting:
1. Make changes in the workspace on the `psaintel` branch.
2. Stage and commit changes normally:
   ```bash
   git add apps/login/...
   git commit -m "feat: add my new customization"
   ```
