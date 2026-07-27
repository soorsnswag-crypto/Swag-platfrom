# Swag Platform Git Guidelines

Version: 1.0

Status: Approved

Owner: Project Architect

---

# Purpose

This document defines the official Git workflow for Swag Platform.

Every contributor must follow these guidelines.

---

# Branch Strategy

main

Production-ready code only.

develop

Integration branch for completed features.

feature/<feature-name>

One feature per branch.

bugfix/<bug-name>

One bug per branch.

hotfix/<issue-name>

Critical production fixes only.

---

# Commit Message Format

Use clear commit messages.

Examples:

docs: update project vision

feat: add wallet screen

fix: resolve login issue

refactor: improve reel player

style: update button spacing

test: add wallet tests

---

# Commit Rules

One logical change per commit.

Never mix unrelated changes.

Commit after testing.

Never commit broken code.

---

# Pull Request Rules

Every Pull Request must include:

Purpose

Files Changed

Testing Status

Screenshots (if UI changed)

Checklist

---

# Code Review Checklist

Documentation updated.

Coding standards followed.

No hardcoded secrets.

No unnecessary dependencies.

No unused files.

No debug code.

---

# Merge Rules

Only reviewed code may be merged.

Resolve conflicts before merging.

Delete feature branch after merge.

---

# Release Tags

v1.0.0

v1.1.0

v2.0.0

Use semantic versioning.

---

# Acceptance Criteria

Git history remains clean.

Every change is traceable.

Developers follow a consistent workflow.

---

# Next Document

SECURITY.md
