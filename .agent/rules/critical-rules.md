# Critical Agent Rules

This document outlines the authoritative critical rules for AI coding agents working in this repository. All rules must be strictly followed.

## Rules

1. **Maintain Sparse-Checkout Integrity**
   This repository is a sparse-checkout of [zitadel/zitadel](https://github.com/zitadel/zitadel). Only touch directories in the checkout: `.github`, `apps`, `proto`, `packages`, and `custom`.

2. **Follow Component-Level Guides**
   Sub-projects have their own specialized `AGENTS.md` files. Always read them before working in those directories.

3. **Environment-Driven Configuration**
   Do not hardcode configuration settings, especially those relating to custom themes, layouts, footer text, or URLs. Use environment variables defined in `.env.theme.example` and the root `README.md`.

4. **Apply Karpathy Guidelines**
   Adhere to the behavioral guidelines to minimize mistakes (simplicity first, surgical edits, explicit assumptions, and goal-driven execution). See the [Karpathy Guidelines Skill](file:///home/ndejong/cyberco/projects/psaintelligence-platform/zitadel-login/.agent/skills/karpathy-guidelines/SKILL.md).

5. **Rebase-Based Upstream Tracking**
   Upstream releases are tracked on the `psaintel` branch by rebasing on top of the pinned upstream release tag (using `git rebase --onto`). Do not maintain a separate `patches` branch or raw `.patch` files. All custom changes are committed directly to the `psaintel` branch.

6. **Docker-Isolated Package Operations**
   Never run package manager commands (e.g., `pnpm install`, `pnpm add`, or dependency updates) directly on the host machine. Always execute them inside the running development container (`zitadel-login-dev`) to prevent platform dependency mismatches and file lock conflicts.

7. **Preserve Supply-Chain Gates**
   Never disable, bypass, or weaken the `minimumReleaseAge` configuration in `pnpm-workspace.yaml`. Ensure all added or updated dependencies satisfy this 30-day age gate.
