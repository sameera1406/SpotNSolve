# Spot & Solve - Master Antigravity Prompt

# Objective

You are an expert Senior Software Engineer, Senior UI/UX Designer, Frontend Architect, and React + Supabase specialist.

Your task is to generate a production-quality frontend for the project **Spot & Solve**.

This is NOT a prototype.

This is NOT a demo.

Generate a scalable, maintainable, production-ready application that follows modern software engineering standards.

Before generating any code, carefully read and follow the specifications provided in the following project documentation.

---

## Required Documents

Read these files completely before writing any code.

PROJECT.md

DATABASE.md

FEATURES.md

UI_GUIDELINES.md

ROADMAP.md

README.md

These documents define the project's vision, architecture, features, database, UI, and development roadmap.

Every decision must follow these documents.

If any ambiguity exists, choose the solution that best supports scalability, maintainability, and user experience.

---

# Technology Stack

Generate the application using exactly the following technologies.

Frontend

- React 19
- TypeScript
- Vite

Styling

- Tailwind CSS

Routing

- React Router DOM

Icons

- Lucide React

Animation

- Framer Motion

Maps

- Leaflet
- OpenStreetMap

Backend Integration

- Supabase

Authentication

- Supabase Auth

Storage

- Supabase Storage

Deployment

- Vercel

Do not substitute these technologies.

---

# Project Goal

Spot & Solve is a civic issue reporting platform where citizens report public infrastructure issues and administrators verify, manage, and resolve them.

The application must feel like a professional SaaS platform rather than a typical government website.

The user experience should be modern, fast, intuitive, responsive, and accessible.

---

# Required Folder Structure

Generate a clean, modular architecture.

```

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

notifications/

profile/

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

utils/

constants/

App.tsx

main.tsx

```

Follow clean architecture principles.

Never place business logic inside UI components.

---

# Environment Variables

Generate

```

.env.example

```

Contents

```

VITE_SUPABASE_URL=

VITE_SUPABASE_ANON_KEY=

```

Never hardcode credentials.

Always read from environment variables.

---

# Supabase Client

Generate

```

src/lib/supabase.ts

```

using

```

@supabase/supabase-js

```

The client must be ready to connect immediately after the user provides environment variables.

---

# Authentication

Prepare complete Supabase authentication.

Implement

Register

Login

Logout

Session Persistence

Protected Routes

Role Based Routing

Password Reset

Email Verification Flow

Authentication Context

Auth Hooks

Loading States

Do not create custom authentication.

Use Supabase Auth only.

---

# User Roles

Support two roles.

Citizen

Administrator

Each role must have its own dashboard.

---

# Citizen Dashboard

Generate

Dashboard

Nearby Issues

Trending Issues

Recently Reported

Search

Filters

Quick Actions

Statistics

Notifications

Profile Summary

---

# Administrator Dashboard

Generate

Analytics

Pending Issues

Verified Issues

Resolved Issues

Category Statistics

Recent Activity

Quick Management Actions

Charts

Tables

Cards

---

# Pages

Generate every page.

Landing Page

Login

Register

Forgot Password

Dashboard

Report Issue

Issue Details

My Issues

Notifications

Profile

Settings

Admin Dashboard

Manage Issues

Categories

Analytics

404 Page

Loading Page

Every page must be fully responsive.

---

# Components

Generate reusable components.

Navbar

Sidebar

Footer

Issue Card

Issue List

Comment Card

Notification Card

Timeline

Map

Image Gallery

Upload Component

Status Badge

Priority Badge

Category Badge

Modal

Dialog

Toast

Button

Input

Textarea

Select

Search

Filter Panel

Loader

Skeleton

Pagination

Empty State

Error State

Profile Menu

Avatar

Charts

Statistics Cards

Every component must be reusable.

---

# Design Requirements

Follow UI_GUIDELINES.md exactly.

The UI should be

Modern

Minimal

Professional

Premium

Clean

Responsive

Accessible

Government-Tech Inspired

Use

Soft Shadows

Rounded Cards

Smooth Animations

Generous White Space

Consistent Typography

Consistent Colors

Glassmorphism where appropriate

Never create inconsistent layouts.

---

# Responsive Design

Support

Desktop

Laptop

Tablet

Mobile

Sidebar collapses automatically.

Navigation adapts automatically.

Touch-friendly controls.

---

# Routing

Configure

React Router

Protected Routes

Public Routes

Role-Based Routes

404 Route

Lazy Loaded Pages

---

# State Management

Use

React Context

React Hooks

Custom Hooks

Keep state modular.

Avoid unnecessary re-renders.

---

# Service Layer

Create services for every module.

Example

authService

issueService

voteService

notificationService

profileService

categoryService

commentService

These services should currently use mock data but expose the same interface that future Supabase database calls will use.

This allows backend integration without changing UI components.

---

# Dummy Data Strategy

Initially use mock data.

However,

Never hardcode data inside components.

Mock data should exist only inside services.

When backend integration begins, replacing mock services with Supabase should require minimal code changes.

---

# Forms

All forms must include

Validation

Error Messages

Loading Indicators

Disabled States

Success Feedback

Required Field Indicators

Proper Accessibility

---

# Maps

Use

Leaflet

OpenStreetMap

Support

Current Location

Issue Marker

Location Picker

Map Zoom

Marker Popup

Navigation Link

---

# Image Upload

Prepare reusable upload component.

Support

Drag & Drop

Browse

Preview

Progress

Remove

Future Supabase Storage Integration

---

# Tables

Administrator tables should support

Sorting

Filtering

Pagination

Responsive Design

Sticky Header

Search

---

# Search

Support

Global Search

Issue Search

Category Search

Instant Search Results

Future Search Suggestions

---

# Filters

Generate

Category

Status

Severity

Distance

Votes

Date

Filters should be reusable across pages.

---

# Timeline

Generate a beautiful timeline component.

Used for

Issue Progress

Status History

Resolution Updates

Administrator Actions

---

# Notifications

Generate complete notification UI.

Unread Badge

Mark as Read

Grouped Notifications

Timestamp

Notification Types

---

# Animations

Use Framer Motion.

Animations should be subtle.

Avoid excessive movement.

---

# Loading States

Every asynchronous page should include

Skeleton Loader

Loading Spinner

Progress Bar

Image Placeholder

---

# Error States

Every page should support

Retry Button

Friendly Error Message

Recovery Actions

---

# Accessibility

Follow WCAG guidelines.

Keyboard Navigation

Screen Reader Friendly

Semantic HTML

Proper Labels

Visible Focus States

High Contrast

---

# Performance

Implement

Code Splitting

Lazy Loading

Image Optimization

Reusable Components

Memoization where appropriate

Optimized Rendering

---

# Coding Standards

Use strict TypeScript.

Never use any.

Avoid duplicated code.

Use reusable components.

Keep files small.

Follow consistent naming conventions.

Business logic belongs inside services.

Components remain presentational whenever possible.

---

# Comments

Write meaningful comments only where required.

Avoid unnecessary comments.

---

# Code Quality

Generate production-ready code.

No placeholder TODOs.

No incomplete pages.

No broken imports.

No duplicated components.

No unused files.

No console errors.

---

# Deployment

The project must run immediately after

npm install

npm run dev

After the user provides

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

the application should already be capable of connecting to Supabase.

No further architectural changes should be required.

---

# Expected Result

Generate a polished, scalable, and professional frontend for Spot & Solve that is fully prepared for Supabase integration.

The codebase should demonstrate senior-level React architecture, clean design patterns, and excellent UI/UX.

The application should be suitable for:

- Production deployment
- Hackathons
- Engineering placements
- GitHub portfolio
- Software engineering interviews

Treat this project as if it will be maintained by a professional engineering team for years to come.

Generate complete, consistent, and high-quality code while following every document provided.