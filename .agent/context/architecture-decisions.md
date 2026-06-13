# Architecture Decisions

Decisions made about this codebase, with context and rationale.
Format: lightweight ADR — Status / Context / Decision / Consequences.

---

## ADR 001: Sparse-Checkout Strategy from Upstream ZITADEL

- **Status**: Active
- **Context**: The platform requires a heavily customized ZITADEL login portal, but we must track upstream developments and security fixes from [zitadel/zitadel](https://github.com/zitadel/zitadel) without maintaining a full, bloated clone of the entire platform.
- **Decision**: Fork the upstream repository and use a **Git sparse-checkout** configuration:
  ```bash
  git sparse-checkout set .github .agent apps proto packages custom
  ```
- **Consequences**:
  - Focuses local developer resources and AI agents on the components relevant to customize and package the login page.
  - Simplifies upstream merges via git commands (`git fetch upstream`, `git merge upstream/main`).
  - *Risk*: AI agents must not attempt to add or import modules from parts of ZITADEL not checked out locally unless they modify the sparse-checkout targets.

---

## ADR 002: Docker Compose Development Node Isolation

- **Status**: Active
- **Context**: Developing a Next.js application in monorepos using Docker mount binds often results in OS conflicts (e.g. native modules compiled for Darwin vs Linux) and file locking issues during package installations.
- **Decision**: Isolate the monorepo's `node_modules` directory and `pnpm` store within named Docker volumes in `docker-compose-dev.yml`:
  ```yaml
  volumes:
    login-pnpm-store:
    login-app-node_modules:
    ...
  ```
- **Consequences**:
  - Prevents host-container file locking and permission issues.
  - Ensures clean node installation environments inside Docker.
  - *Trade-off*: Local IDEs might not automatically index container-installed `node_modules` unless developers execute local installations or point their package manager to the corresponding paths.

---

## ADR 003: Environment-Driven Layout & Theme Customization

- **Status**: Active
- **Context**: We need to deploy customized login portal containers across various environments with different color palettes, logo settings, and external links without building separate container images for each target.
- **Decision**: Expose Next.js environment variables prefixed with `NEXT_PUBLIC_` to specify:
  - Theme Roundness, Spacing, Layout, and Appearance (Material vs Flat).
  - Left-hand and Right-hand footer link URLs and label texts.
- **Consequences**:
  - A single Docker image can be configured at deploy time via standard environment variables.
  - Theme customizations are evaluated and injected dynamically.
  - Avoids hardcoded branding elements.

---

## ADR 004: Patch-Based Upstream Tracking

- **Status**: Superseded by ADR 005
- **Context**: The original workflow involved maintaining a direct git fork and merging from `upstream/main`. This merged state led to difficult, labor-intensive conflict resolution during upgrades, as custom features got interleaved with upstream changes.
- **Decision**: Adopt a patch-based approach:
  - The `patches` branch holds only the clean patch set in `custom/patches/`, workflow scripts, and documentation.
  - The `psaintel` branch is the applied result. It resets directly to a pinned upstream release tag (e.g., `v4.15.1`) and applies the patches on top.
  - Dependencies are regenerated inside Docker using the package manager after patch application.
- **Consequences**:
  - Provided a clean separation but introduced heavy double-commit overhead and complex patch/script management.

---

## ADR 005: Rebase-Based Upstream Tracking

- **Status**: Active
- **Context**: ADR 004 (separated `patches` branch with raw patch files) succeeded in separating history but created excessive maintenance friction, double commits, and script complexity.
- **Decision**: Simplify tracking by keeping all custom modifications directly on the `psaintel` branch and using Git rebase (`git rebase --onto`) for upstream tagging:
  - Remove the `patches` branch and `custom/patches/` files entirely.
  - Track the pinned upstream release tag as the base.
  - Rebase `psaintel` onto new upstream tags when upgrading.
- **Consequences**:
  - Eliminates the double-commit overhead.
  - Simplifies local development to standard Git commits.
  - Preserves a clean, linear, and readable Git history.
  - Requires force-pushing `psaintel` to `origin` when base tags are upgraded (acceptable for this build container repository).

