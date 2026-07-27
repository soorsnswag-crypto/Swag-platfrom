# Swag Platform Frontend Folder Structure

Version: 1.0

Status: Approved

Owner: Project Architect

---

# Purpose

This document defines the official frontend folder structure.

Every developer and AI coding agent must follow this structure.

---

# Root Structure

frontend/

├── lib/

├── core/

├── config/

├── theme/

├── routes/

├── shared/

├── features/

├── services/

├── models/

├── assets/

└── main.dart

---

# Core

core/

constants/

errors/

extensions/

helpers/

storage/

network/

utils/

---

# Theme

theme/

colors.dart

typography.dart

spacing.dart

radius.dart

shadows.dart

animations.dart

theme.dart

---

# Shared

shared/

widgets/

dialogs/

bottom_sheet/

buttons/

cards/

inputs/

loading/

empty/

error/

---

# Features

features/

auth/

home/

search/

create/

music/

wallet/

subscription/

notifications/

profile/

settings/

---

# Feature Structure

feature/

data/

domain/

presentation/

widgets/

controllers/

models/

repositories/

services/

---

# Assets

assets/

icons/

images/

fonts/

animations/

audio/

---

# Services

services/

api/

auth/

wallet/

music/

upload/

notification/

analytics/

---

# Models

models/

api/

user/

wallet/

music/

subscription/

reel/

---

# Routing

routes/

app_router.dart

route_names.dart

guards.dart

---

# Naming Rules

Folders

lowercase

snake_case

Files

snake_case.dart

Classes

PascalCase

Variables

camelCase

Constants

UPPER_CASE

---

# Architecture Rule

Presentation

↓

Domain

↓

Data

Never bypass layers.

---

# Acceptance Criteria

Folder structure remains consistent.

Features stay isolated.

Project scales cleanly.

---

# Next Document

NAVIGATION.md
