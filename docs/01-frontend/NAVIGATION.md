# Swag Platform Navigation System

Version: 1.0

Status: Approved

Owner: Project Architect

---

# Purpose

This document defines the official navigation system for Swag Platform.

Navigation must be simple, fast, and intuitive.

---

# Navigation Philosophy

One-hand friendly

Maximum two taps to important features

Minimal navigation depth

Smooth transitions

Consistent experience

---

# Main Navigation

Five Tabs

Home

Search

Create

Wallet

Profile

Always visible except on full-screen media capture.

---

# Home

Default landing page.

Vertical reel feed.

Swipe up/down.

Tap creator profile.

Tap music.

Open comments.

Open share.

---

# Search

Trending

Users

Music

Hashtags

Videos

Creators

Recent searches.

---

# Create

Open camera.

Upload video.

Record reel.

Choose music.

Apply effects.

Publish.

Save draft.

---

# Wallet

Current balance.

Earnings.

Withdraw.

Transactions.

Subscription status.

---

# Profile

Avatar

Bio

Followers

Following

User reels

Saved reels

Settings

---

# Secondary Screens

Notifications

Settings

Subscription

Music Player

Comments

Share

Edit Profile

Withdraw

History

These open as full pages or bottom sheets.

---

# Navigation Rules

Back button always returns logically.

Preserve scroll position.

Do not reset feed unnecessarily.

Avoid deep navigation chains.

---

# Deep Linking

Support:

Profile

Reel

Music

Subscription

Wallet

Share links

---

# Transition Rules

Page transition

200–250 ms

Bottom sheet

Slide up

Dialog

Fade

No excessive animations.

---

# Error Navigation

If a page fails:

Show retry option.

Never leave a blank screen.

---

# Authentication Flow

Splash

↓

Login

↓

Home

Authenticated users skip Login.

---

# Logout Flow

Profile

↓

Settings

↓

Logout

↓

Confirmation

↓

Login

---

# Acceptance Criteria

Navigation is predictable.

Users reach any core feature quickly.

Navigation remains consistent across updates.

---

# Next Document

COMPONENTS.md
