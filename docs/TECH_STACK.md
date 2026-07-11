# TECH_STACK.md

# Spot & Solve - Technology Stack & Engineering Standards

Version: 1.0

Status: Approved

---

# Purpose

This document defines the official technology stack, engineering standards, folder structure, coding conventions, and development tools for Spot & Solve.

Every contributor and AI code generator must follow this document.

No alternative technologies should be introduced without updating this document.

---

# Technology Stack

## Frontend

Framework

- React 19

Language

- TypeScript

Build Tool

- Vite

Package Manager

- npm

---

## Styling

Framework

- Tailwind CSS v4

Libraries

- tailwindcss
- tailwind-merge
- clsx

Icons

- Lucide React

Animations

- Framer Motion

Fonts

- Inter

---

## Routing

- React Router DOM v7

Requirements

- Nested Routing
- Protected Routes
- Lazy Loading
- Role-Based Routing
- 404 Route

---

# Backend

Platform

- Supabase

Database

- PostgreSQL

Authentication

- Supabase Auth

Storage

- Supabase Storage

Security

- Row Level Security (RLS)

---

# Maps

Library

- Leaflet

Map Provider

- OpenStreetMap

Features

- Current Location
- Marker Selection
- Issue Markers
- Navigation Links

---

# Charts

Library

- Recharts

Used For

- Admin Analytics
- Statistics
- Reports

---

# Notifications

Frontend

- Sonner

Purpose

- Success Messages
- Error Messages
- Warnings
- Information

---

# Forms

Validation

- React Hook Form

Schema Validation

- Zod

Requirements

- Real-time Validation
- Type Safety
- Friendly Error Messages

---

# Date & Time

Library

- date-fns

Purpose

- Formatting Dates
- Relative Time
- Timeline

---

# Image Upload

Storage

- Supabase Storage

Supported Formats

- jpg
- jpeg
- png
- webp

Maximum Size

- 5 MB

---

# Environment Variables

Create

.env.example

Contents

VITE_SUPABASE_URL=

VITE_SUPABASE_ANON_KEY=

Never commit

.env

to GitHub.

---

# Folder Structure

src/

assets/

components/

common/

ui/

issues/

layout/

features/

auth/

issues/

profile/

notifications/

admin/

pages/

layouts/

hooks/

context/

services/

lib/

supabase.ts

routes/

types/

constants/

utils/

styles/

App.tsx

main.tsx

---

# Naming Conventions

## Components

PascalCase

Examples

IssueCard.tsx

ProfileMenu.tsx

NotificationCard.tsx

---

## Pages

PascalCase

Examples

DashboardPage.tsx

LoginPage.tsx

IssueDetailsPage.tsx

---

## Hooks

camelCase

Prefix

use

Examples

useAuth.ts

useIssues.ts

useNotifications.ts

---

## Services

camelCase

Examples

authService.ts

issueService.ts

voteService.ts

commentService.ts

---

## Utility Files

camelCase

Examples

formatDate.ts

calculateDistance.ts

---

## Constants

UPPER_CASE

Examples

MAX_UPLOAD_SIZE

DEFAULT_RADIUS

SUPPORTED_IMAGE_TYPES

---

## Types

PascalCase

Examples

Issue.ts

Profile.ts

Notification.ts

---

# Import Order

Always follow this order.

1. React

2. External Libraries

3. Internal Components

4. Hooks

5. Services

6. Types

7. Utilities

8. Styles

---

# State Management

Use

React Context

React Hooks

Custom Hooks

Avoid unnecessary global state.

Business logic belongs inside hooks and services.

---

# Data Flow

Page

↓

Component

↓

Hook

↓

Service

↓

Supabase

↓

Database

UI components must never directly communicate with Supabase.

---

# API Layer

All backend operations must go through

services/

Examples

authService

issueService

profileService

voteService

notificationService

commentService

categoryService

storageService

---

# TypeScript Rules

Strict Mode

Enabled

Never use

any

Use

Interfaces

for objects.

Use

Types

for unions.

Prefer explicit typing.

---

# Code Style

Functions should be small.

Single Responsibility Principle.

Avoid duplicated logic.

Prefer reusable components.

Keep files under approximately 300 lines where practical.

---

# Component Rules

Every component should

Receive props

Avoid direct API calls

Remain reusable

Remain testable

Avoid duplicated styles

---

# Styling Rules

Use Tailwind utility classes.

Avoid inline styles.

Avoid custom CSS unless absolutely necessary.

Create reusable UI components.

Maintain consistent spacing.

---

# Responsive Breakpoints

Mobile

<640px

Tablet

640px+

Laptop

1024px+

Desktop

1280px+

Large Screens

1536px+

Every page must be responsive.

---

# Theme

Default

Light

Architecture must support

Dark Mode

No redesign should be required.

---

# Accessibility

Follow WCAG.

Support

Keyboard Navigation

Screen Readers

ARIA Labels

Visible Focus

Semantic HTML

High Contrast

---

# Performance

Implement

Lazy Loading

Route Splitting

Image Optimization

Memoization

Code Splitting

Virtual Rendering (if required)

Avoid unnecessary renders.

---

# Security

Never expose

API Keys

Secrets

Passwords

Use Supabase RLS.

Validate every request.

Protect every private route.

---

# Git Workflow

Main Branch

main

Feature Branches

feature/auth

feature/issues

feature/profile

feature/admin

Commit Messages

feat:

fix:

refactor:

docs:

style:

test:

chore:

Examples

feat: add issue reporting page

fix: resolve login redirect

docs: update database schema

---

# ESLint Rules

Enable

No Unused Variables

No Implicit Any

Consistent Imports

Prefer Const

Strict Equality

---

# Formatting

Use

Prettier

Rules

2 Spaces

Single Quotes

Semicolons

Trailing Commas

Consistent Line Width

---

# Recommended Packages

Core

react

react-dom

typescript

vite

Routing

react-router-dom

Backend

@supabase/supabase-js

Forms

react-hook-form

zod

Animations

framer-motion

Maps

leaflet

react-leaflet

Icons

lucide-react

Charts

recharts

Utilities

date-fns

clsx

tailwind-merge

Notifications

sonner

---

# Build Commands

Install

npm install

Development

npm run dev

Production Build

npm run build

Preview

npm run preview

Lint

npm run lint

---

# Deployment

Frontend

Vercel

Backend

Supabase

Requirements

Configure

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

before deployment.

---

# Engineering Principles

- Build reusable components.
- Keep business logic outside UI.
- Prefer composition over duplication.
- Use strict typing.
- Write maintainable code.
- Optimize for readability.
- Follow clean architecture.
- Keep the application scalable.

---

# Definition of Production Ready

The project is considered production-ready when:

✓ TypeScript compiles without errors.

✓ ESLint passes.

✓ No console errors.

✓ Responsive on all devices.

✓ Authentication works.

✓ Database integration works.

✓ RLS policies protect data.

✓ Performance is optimized.

✓ Accessibility requirements are met.

✓ Code follows this document completely.

---

# Final Engineering Vision

Spot & Solve is intended to be a production-quality civic technology platform.

Every architectural decision should prioritize scalability, maintainability, security, performance, accessibility, and developer experience.

The codebase should be clean enough that a professional engineering team could continue development with minimal onboarding.

When in doubt, choose the solution that improves long-term maintainability over short-term convenience.