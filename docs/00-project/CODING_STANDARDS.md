# Swag Platform Coding Standards

Version: 1.0

Status: Approved

Owner: Project Architect

---

# Purpose

This document defines the official coding standards for Swag Platform.

Every developer and AI coding agent must follow these standards.

Consistency is more important than personal coding style.

---

# General Principles

Code must be:

Readable

Maintainable

Reusable

Testable

Scalable

Simple

---

# Naming Rules

## Files

Use snake_case.

Example:

home_screen.dart

create_reel_page.dart

wallet_repository.dart

---

## Classes

Use PascalCase.

Example:

HomeScreen

UserRepository

WalletController

---

## Variables

Use camelCase.

Example:

userName

walletBalance

selectedMusic

---

## Constants

Use lowerCamelCase with const.

Example:

const defaultPadding = 16.0;

---

# Function Rules

Every function must have one responsibility.

Keep functions short.

Prefer less than 40 lines.

Avoid deeply nested logic.

---

# Widget Rules

Never build huge widgets.

Extract reusable widgets.

Prefer composition over duplication.

---

# State Management Rules

Business logic must stay outside UI.

UI only displays state.

Repositories handle data.

Providers manage state.

---

# API Rules

Never call APIs directly from UI.

Always use Repository Layer.

Handle all errors.

Handle loading state.

Handle empty state.

---

# Error Handling

Every async operation must handle:

Loading

Success

Error

Timeout

Offline

---

# Comments

Write comments only when necessary.

Code should explain itself.

Avoid obvious comments.

---

# Formatting

Use dart format.

No trailing spaces.

Consistent indentation.

---

# Imports

Official packages

↓

Third-party packages

↓

Project imports

---

# Performance Rules

Avoid unnecessary rebuilds.

Reuse widgets.

Cache expensive operations.

Lazy load data.

---

# Security Rules

Never hardcode secrets.

Never expose tokens.

Validate all API responses.

---

# Testing Rules

Critical logic must be testable.

Repositories should be easy to mock.

---

# Documentation Rules

Complex logic requires documentation.

Every public module should have documentation.

---

# Code Review Checklist

Readable?

Reusable?

Secure?

Performant?

Documented?

Testable?

Approved?

---

# Acceptance Criteria

Every developer follows the same coding style.

Codebase remains clean and maintainable.

AI-generated code matches project standards.

---

# Next Document

GIT_GUIDELINES.md
