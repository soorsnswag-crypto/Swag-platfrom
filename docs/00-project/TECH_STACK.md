# Swag Platform Technology Stack

Version: 1.0

Status: Approved

Owner: Project Architect

---

# Purpose

This document defines the official technology stack for Swag Platform.

All developers and AI coding agents must follow this document.

Technologies may only be changed after architectural approval.

---

# Technology Principles

The selected technologies must be:

• Stable

• Scalable

• Well documented

• Production ready

• Easy to maintain

• Widely supported

---

# Frontend

Framework

Flutter Stable

Reason

Single codebase.

High performance.

Excellent UI capabilities.

Large ecosystem.

Long-term support.

---

Programming Language

Dart

---

State Management

Riverpod

Reason

Modern.

Simple.

Scalable.

Feature-based architecture friendly.

Easy testing.

---

Routing

GoRouter

Reason

Official recommendation.

Deep linking support.

Scalable navigation.

---

Networking

Dio

Reason

Interceptor support.

Timeout handling.

Logging.

File upload.

Token refresh.

---

JSON Serialization

json_serializable

Reason

Type safe.

Fast.

Maintainable.

---

Dependency Injection

Riverpod Providers

No additional dependency injection framework required.

---

Video Player

video_player

Purpose

Play reels.

Preview uploads.

Music synchronization.

---

Camera

camera

Purpose

Record videos.

Take photos.

Future live recording support.

---

Image Picker

image_picker

Purpose

Gallery selection.

Profile image.

Video selection.

---

Local Storage

Hive

Purpose

Cache.

Offline settings.

Drafts.

Recently viewed data.

---

Secure Storage

flutter_secure_storage

Purpose

JWT Tokens.

Refresh Tokens.

Sensitive information.

---

Permissions

permission_handler

Purpose

Camera.

Microphone.

Storage.

Notifications.

---

Animations

Flutter Native Animation System

Additional

Lottie

Purpose

Premium animations.

Splash.

Loading.

Empty states.

---

Backend

Cloudflare Workers

Purpose

REST API.

Business Logic.

Authentication.

Security.

Fast global execution.

---

Database

Cloudflare D1

Purpose

Users.

Reels.

Comments.

Wallet.

Subscription.

Notifications.

---

File Storage

Cloudflare R2

Purpose

Videos.

Images.

Profile pictures.

Thumbnail storage.

---

Cache

Cloudflare Cache

Purpose

Fast API responses.

Media optimization.

---

Authentication

Google Sign-In

JWT Authentication

Refresh Token

Session Validation

---

Notifications

Firebase Cloud Messaging

Purpose

Push notifications.

---

Analytics

Firebase Analytics

Purpose

User behavior.

Performance tracking.

Feature usage.

---

Crash Reporting

Firebase Crashlytics

Purpose

Production crash monitoring.

---

External Music System

External Music API

Purpose

Trending music.

Music search.

Song metadata.

Live music catalog.

Swag does not store copyrighted music internally.

---

Payments

Payment Gateway

Responsibilities

Premium subscription.

Wallet recharge.

Creator payouts.

Gateway selection will be finalized before implementation.

---

Version Control

Git

GitHub

---

Project Management

GitHub Issues

GitHub Projects

GitHub Pull Requests

---

Testing

Flutter Test

Widget Test

Integration Test

Manual QA

---

Code Quality

flutter analyze

dart format

lint rules

---

CI/CD (Future)

GitHub Actions

Automatic Testing

Automatic Deployment

---

Architecture Pattern

Feature First

Repository Pattern

Clean Architecture Principles

Modular Development

---

Coding Standards

Readable code.

Reusable components.

Small functions.

Single responsibility.

Documentation first.

---

Technology Rules

Never introduce new libraries without approval.

Prefer official packages.

Keep dependencies updated.

Avoid abandoned packages.

---

Acceptance Criteria

Technology stack is officially documented.

Developers use approved tools.

AI follows approved libraries.

Architecture remains consistent.

---

Related Documents

README.md

VISION.md

GOALS.md

FEATURES.md

RULES.md

WORKFLOW.md

ARCHITECTURE.md

---

Next Document

CODING_STANDARDS.md
