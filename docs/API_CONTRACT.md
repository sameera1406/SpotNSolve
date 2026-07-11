# API_CONTRACT.md

# Spot & Solve - Frontend & Backend Contract

Version: 1.0

Status: Approved

Backend: Supabase

---

# Purpose

This document defines how the frontend communicates with the backend.

The frontend should NEVER access database tables directly from UI components.

Instead, all communication should happen through the service layer.

Example:

Page

↓

Component

↓

Service

↓

Supabase

↓

Database

---

# Service Architecture

src/

services/

authService.ts

profileService.ts

issueService.ts

voteService.ts

commentService.ts

notificationService.ts

categoryService.ts

storageService.ts

Every service exposes reusable functions.

---

# Authentication Service

## Register

Input

Full Name

Email

Password

Output

Authenticated User

Profile Created

Session Started

---

## Login

Input

Email

Password

Output

Session

User

Role

---

## Logout

Output

Session Destroyed

---

## Get Current User

Returns

User

Profile

Role

---

# Profile Service

## Get Profile

Input

userId

Returns

Profile Object

---

## Update Profile

Input

Full Name

Avatar

Locality

Returns

Updated Profile

---

# Issue Service

## Create Issue

Input

Title

Description

Category ID

Latitude

Longitude

Address

Created By

Returns

Created Issue

---

## Update Issue

Input

Issue ID

Updated Fields

Returns

Updated Issue

---

## Delete Issue

Allowed only before verification.

Returns

Success

---

## Get All Issues

Supports

Pagination

Search

Filtering

Sorting

Returns

Issue List

---

## Get Issue By ID

Returns

Issue

Images

Votes

Timeline

Comments

---

## Search Issues

Input

Keyword

Returns

Matching Issues

---

## Filter Issues

Supports

Category

Status

Priority

Distance

Date

Returns

Filtered Results

---

# Image Service

## Upload Image

Input

Image File

Issue ID

Before / After

Returns

Image URL

---

## Delete Image

Input

Image ID

Returns

Success

---

# Vote Service

## Upvote Issue

Input

Issue ID

User ID

Rules

One vote per user.

Returns

Updated Vote Count

---

## Remove Vote

Returns

Updated Vote Count

---

## Get Vote Count

Returns

Integer

---

# Comment Service

## Add Comment

Input

Issue ID

Comment

Author

Returns

Created Comment

---

## Edit Comment

Allowed

Comment Owner

Administrator

---

## Delete Comment

Allowed

Comment Owner

Administrator

---

## Get Comments

Input

Issue ID

Returns

Comment List

---

# Timeline Service

## Add Update

Administrator Only

Input

Status

Comment

Estimated Completion

Returns

Timeline Event

---

## Get Timeline

Returns

Ordered Timeline Events

---

# Notification Service

## Get Notifications

Returns

Notification List

---

## Mark Notification Read

Input

Notification ID

Returns

Success

---

## Mark All Read

Returns

Success

---

# Category Service

## Get Categories

Returns

Category List

---

## Create Category

Administrator Only

---

## Edit Category

Administrator Only

---

## Delete Category

Administrator Only

---

# Analytics Service

Administrator Only

Returns

Total Issues

Resolved Issues

Pending Issues

Average Resolution Time

Top Categories

Trending Areas

Monthly Reports

---

# Duplicate Detection

Input

Latitude

Longitude

Radius

Returns

Nearby Existing Issues

Frontend displays

Possible Duplicate Found

Options

Upvote Existing

Continue Reporting

---

# Error Format

Every service returns a common structure.

Success

{
  success: true,
  data: ...
}

Failure

{
  success: false,
  error: {
      message: "...",
      code: "..."
  }
}

---

# Loading Convention

Every async request supports

Loading

Success

Error

Empty

---

# Security

Every request must respect

Authentication

Authorization

Row Level Security

Storage Policies

---

# File Upload Rules

Allowed

jpg

jpeg

png

webp

Maximum Size

5 MB

Multiple Images

Supported

---

# Naming Convention

Functions

camelCase

Interfaces

PascalCase

Types

PascalCase

Constants

UPPER_CASE

---

# Future APIs

The architecture should support

AI Duplicate Detection

AI Severity Prediction

Push Notifications

GIS Heatmaps

Department Assignment

Public API

Mobile Application

---

# API Design Principles

The frontend must never depend directly on database tables.

Every feature communicates through services.

Replacing Supabase with another backend should require changes only inside the service layer.