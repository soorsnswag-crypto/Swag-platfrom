# Swag Platform Database

Version: 1.0

Status: Approved

Owner: Project Architect

---

# Purpose

Provide a scalable, secure and high-performance database architecture using Supabase PostgreSQL.

---

# Technology

Database: Supabase PostgreSQL

Authentication: Supabase Auth

Storage: Supabase Storage

Realtime: Supabase Realtime

Functions: Supabase Edge Functions

---

# Core Tables

profiles

users_public

reels

comments

likes

follows

bookmarks

messages

conversations

notifications

wallets

transactions

subscriptions

reports

hashtags

music

admin_logs

---

# Relationships

Auth User → Profile

Profile → Reels

Reel → Comments

Reel → Likes

Profile → Followers

Conversation → Messages

Wallet → Transactions

Profile → Notifications

---

# Row Level Security

Enable RLS on every public table.

Users can read public content.

Users can modify only their own records.

Admins have elevated access through policies.

---

# Indexes

user_id

reel_id

created_at

updated_at

conversation_id

hashtag

username

email

---

# Storage Buckets

avatars

reels

thumbnails

music

documents

reports

---

# Realtime

Messages

Notifications

Likes

Comments

Follower events

Wallet updates

---

# Backups

Automatic daily backups

Point-in-time recovery

Migration support

---

# Performance

Indexed queries

Connection pooling

Optimized joins

Pagination

Caching where appropriate

---

# Security

Encrypted connections

RLS enforcement

Signed URLs

Secure storage buckets

Audit logging

---

# Acceptance Criteria

All tables use RLS.

Queries remain performant.

Relationships remain consistent.

---

# Next Document

STORAGE.md
