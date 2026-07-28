# Swag Platform Environment

Version: 1.0

Status: Approved

Owner: Project Architect

---

# Purpose

Define configuration for Development, Staging, and Production environments.

---

# Environments

Development

Staging

Production

---

# Development

Local development

Debug enabled

Test database

Mock services allowed

---

# Staging

Production-like environment

Pre-release testing

Performance validation

Integration testing

---

# Production

High availability

Optimized performance

Secure configuration

Monitoring enabled

Backups enabled

---

# Environment Variables

## App
APP_ENV — Environment (development/staging/production)
APP_NAME — Application display name
APP_VERSION — Current version

## Supabase
SUPABASE_URL — Supabase project URL
SUPABASE_ANON_KEY — Public anonymous key (safe for frontend)
SUPABASE_SERVICE_ROLE_KEY — Secret service role key (backend only)
SUPABASE_ACCESS_TOKEN — Supabase management API token

## Cloudflare
CLOUDFLARE_API_KEY — Cloudflare global API key
CLOUDFLARE_API_TOKEN — Cloudflare API token
CLOUDFLARE_ACCOUNT_ID — Cloudflare account identifier

## Cloudflare R2
R2_ENDPOINT — R2 S3-compatible endpoint URL
R2_ACCESS_KEY_ID — R2 access key
R2_SECRET_ACCESS_KEY — R2 secret access key
R2_TOKEN_VALUE — R2 token value

## JWT
JWT_SECRET — Token signing secret

## API
API_BASE_URL — Backend API base URL
API_VERSION — API version prefix

## Storage
STORAGE_BUCKET — Default storage bucket name

## Supabase Project (Current)
SUPABASE_URL: https://inzkfhonicyeuglcfhgl.supabase.co
CLOUDFLARE_ACCOUNT_ID: 488a8034477677c405fd7f66ee013c24
R2_ENDPOINT: https://488a8034477677c405fd7f66ee013c24.r2.cloudflarestorage.com

---

# Secrets Management

Encrypted secrets

Environment isolation

Restricted access

Secret rotation

Audit logging

---

# Feature Flags

Experimental features

Beta rollout

Regional rollout

Emergency disable

---

# Configuration

Environment-specific values

Immutable production configuration

Centralized management

Version controlled

---

# Monitoring

Environment health

Error reporting

Performance metrics

Availability checks

---

# Acceptance Criteria

Environment configuration is consistent.

Secrets remain protected.

Production deployment is stable.

---

# Next Document

CI_CD.md
