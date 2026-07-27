# Swag Platform API Standards

Version: 1.0

Status: Approved

Owner: Project Architect

---

# Purpose

This document defines the official API standards for Swag Platform.

Every backend service and frontend client must follow these rules.

---

# API Versioning

Base URL

/api/v1

Future versions

/api/v2

Never break previous versions.

---

# REST Principles

Use resource-based endpoints.

Use HTTP methods correctly.

Keep endpoints predictable.

---

# HTTP Methods

GET

Read data.

POST

Create data.

PUT

Replace data.

PATCH

Update partial data.

DELETE

Remove data.

---

# Endpoint Naming

Good

/users

/reels

/music

/wallet

/subscriptions

Bad

/getUsers

/createReel

/doSomething

Use plural nouns.

Lowercase only.

---

# Request Format

Content-Type

application/json

Accept

application/json

---

# Response Format

Success

{
  "success": true,
  "data": {}
}

Error

{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Request failed."
  }
}

---

# HTTP Status Codes

200 OK

201 Created

204 No Content

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

429 Too Many Requests

500 Internal Server Error

---

# Pagination

Use:

page

limit

Example

/reels?page=1&limit=20

---

# Filtering

Example

/reels?category=music

/reels?language=en

---

# Sorting

Example

/reels?sort=latest

/reels?sort=popular

---

# Authentication

Authorization

Bearer JWT_TOKEN

Every protected endpoint requires authentication.

---

# Validation

Validate:

Required fields

Length

Type

Format

Ownership

---

# Rate Limiting

Protect every public API.

Prevent abuse.

Return HTTP 429 if exceeded.

---

# Error Messages

Use consistent error codes.

Never expose server internals.

Messages must be user friendly.

---

# API Documentation

Every endpoint must include:

Purpose

Request

Response

Authentication

Errors

Examples

---

# Acceptance Criteria

API structure is consistent.

Frontend integration is predictable.

Documentation stays maintainable.

---

# Next Document

TESTING_STRATEGY.md
