# Agent Instructions

**Welcome!** This directory contains guidance for AI coding agents (Claude Code, Google Antigravity, etc.) working with this project.

## Critical Rules

All AI agents must strictly adhere to the project's safety, stability, and workflow requirements:
- **[Critical Agent Rules](file:///home/ndejong/cyberco/projects/psaintelligence-platform/zitadel-login/.agent/rules/critical-rules.md)**: 7 rules regarding sparse checkouts, Docker-isolated package management, supply-chain protections, and Git rebase-based tracking.
- **[Upstream Synchronization Workflow](file:///home/ndejong/cyberco/projects/psaintelligence-platform/zitadel-login/.agent/workflows/upstream-sync.md)**: Step-by-step instructions for tracking upstream tags and rebasing.

## Quick Start

Execute these common target workflows via `pnpm` and `nx` from the workspace root:

- **Run Dev Database**: `pnpm nx run @zitadel/devcontainer:compose up db`
- **Run Dev Server (Login App)**: `pnpm nx run @zitadel/login:dev`
- **Build Login App**: `pnpm nx run @zitadel/login:build`
- **Lint Login App**: `pnpm nx run @zitadel/login:lint`
- **Run Login App Tests**: `pnpm nx run @zitadel/login:test`
- **Docker Compose (Local Dev)**: `docker compose -f docker-compose-dev.yml up`
- **Docker Build (Production)**: `docker build -t zitadel-login-$(date -u +%Y%m%dz%H%M%S) -f apps/login/Dockerfile .`

## Instruction Files

For component-specific details, consult the following guides:
- **Login App**: [apps/login/AGENTS.md](file:///home/ndejong/cyberco/projects/psaintelligence-platform/zitadel-login/apps/login/AGENTS.md)
- **API (Go Backend)**: [apps/api/AGENTS.md](file:///home/ndejong/cyberco/projects/psaintelligence-platform/zitadel-login/apps/api/AGENTS.md)
- **Packages (TypeScript Libraries)**: [packages/AGENTS.md](file:///home/ndejong/cyberco/projects/psaintelligence-platform/zitadel-login/packages/AGENTS.md)
- **Proto (API Contracts)**: [proto/AGENTS.md](file:///home/ndejong/cyberco/projects/psaintelligence-platform/zitadel-login/proto/AGENTS.md)

## Documentation Hierarchy

All agent-centric documentation and workflows are organized under the `.agent/` directory:
- **[Critical Agent Rules](file:///home/ndejong/cyberco/projects/psaintelligence-platform/zitadel-login/.agent/rules/critical-rules.md)**: Key rules governing safety, package actions, and security gates.
- **[Upstream Synchronization Workflow](file:///home/ndejong/cyberco/projects/psaintelligence-platform/zitadel-login/.agent/workflows/upstream-sync.md)**: Process instructions for tracking and rebasing upstream tags.
- **[Architecture Overview](file:///home/ndejong/cyberco/projects/psaintelligence-platform/zitadel-login/.agent/context/architecture.md)**: Workspace topology, technology stack, and component interactions.
- **[Architecture Decisions (ADRs)](file:///home/ndejong/cyberco/projects/psaintelligence-platform/zitadel-login/.agent/context/architecture-decisions.md)**: Record of historical architectural choices and context.

## Active Skills

This workspace provides custom agent skills located in `.agent/skills/`:
- **[karpathy-guidelines](file:///home/ndejong/cyberco/projects/psaintelligence-platform/zitadel-login/.agent/skills/karpathy-guidelines/SKILL.md)**: Standard behavioral guidelines for LLM code generation.
- **[docker-expert](file:///home/ndejong/cyberco/projects/psaintelligence-platform/zitadel-login/.agent/skills/docker-expert/SKILL.md)**: Best practices for Docker configuration, multi-stage builds, and Compose orchestration.
- **[vulnerability-scanner](file:///home/ndejong/cyberco/projects/psaintelligence-platform/zitadel-login/.agent/skills/vulnerability-scanner/SKILL.md)**: Security assessment checklist for identifying potential vulnerabilities.
- **[caveman](file:///home/ndejong/cyberco/projects/psaintelligence-platform/zitadel-login/.agent/skills/caveman/SKILL.md)**: Communication efficiency helper (token consumption reducer).

## Key Principles

- **No duplication** — Each concept has ONE authoritative location
- **Cross-reference** — Link to details instead of copying content
