# Swag Platform Architecture

Version: 1.0

Status: Approved

Owner: Project Architect

---

# Purpose

This document defines the complete technical architecture of Swag Platform.

Every developer must understand this architecture before writing code.

No implementation may violate this architecture without approval.

---

# Architecture Philosophy

Swag Platform is designed around five principles.

• Simple

• Scalable

• Modular

• Maintainable

• Performance First

Every new feature must follow these principles.

---

# High Level Architecture

User

↓

Flutter Mobile App

↓

API Layer

↓

Cloudflare Worker Backend

↓

Business Logic

↓

Database

↓

Storage

↓

External Services

---

# Frontend Architecture

Presentation Layer

↓

Feature Layer

↓

State Management

↓

Repository Layer

↓

API Client

↓

Cache

↓

Storage

---

# Backend Architecture

API Gateway

↓

Authentication

↓

User Service

↓

Reel Service

↓

Music Service

↓

Wallet Service

↓

Subscription Service

↓

Notification Service

↓

Admin Service

---

# Main Modules

The application is divided into independent modules.

Authentication

Home Feed

Reels

Music

Create Reel

Search

Profile

Wallet

Subscription

Notifications

Settings

Admin

Every module must be independent and reusable.

---

# Authentication Module

Responsibilities

User Login

Registration

Google Login

JWT Authentication

Session Validation

Logout

---

# Home Feed Module

Responsibilities

Load reels

Infinite scrolling

Recommendation

Like

Comment

Share

Save

Follow

---

# Reel Module

Responsibilities

Video Upload

Video Compression

Thumbnail

Caption

Hashtags

Visibility

Delete

Edit

---

# Music Module

Responsibilities

External Music API

Music Search

Trending Music

Music Details

Use Music

Sing With Music

Music Synchronization

---

# Live Music System

Music is provided through an external music provider.

Swag does not store copyrighted music internally.

The application consumes music through approved APIs.

Users can:

Browse music.

Select music.

Record with music.

Publish reels using supported tracks.

---

# Wallet Module

Responsibilities

Balance

Transactions

Creator Earnings

Withdraw Requests

Subscription Payments

History

---

# Subscription Module

Responsibilities

Free Plan

Premium Plan

Membership Status

Renewal

Expiry

Premium Badge

Premium Features

---

# Notification Module

Responsibilities

Likes

Comments

Followers

Wallet

Subscription

System Messages

---

# Search Module

Users

Reels

Music

Hashtags

---

# Profile Module

Avatar

Bio

Followers

Following

User Reels

Saved Reels

Liked Reels

---

# External Services

Google Authentication

Music Provider API

Push Notifications

Cloud Storage

Analytics

Payment Gateway

---

# Security Principles

Authentication required.

Authorization required.

API validation required.

Sensitive data encrypted.

Secrets stored in environment variables.

Never expose API keys.

---

# Scalability

Every module should be replaceable without affecting other modules.

Future modules include:

Live Streaming

Live Gifts

Marketplace

AI Creator Tools

Creator Studio

---

# Architecture Rules

Never bypass repositories.

Never call APIs directly from UI.

Keep business logic outside UI.

Every module owns its own responsibilities.

---

# Acceptance Criteria

Architecture is documented.

Modules are clearly defined.

Responsibilities are separated.

Developers understand project structure.

AI developers can implement without guessing.

---

# Related Documents

README.md

VISION.md

GOALS.md

FEATURES.md

RULES.md

WORKFLOW.md

---

# Next Document

TECH_STACK.md
