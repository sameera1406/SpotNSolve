# UI_GUIDELINES.md

# Spot & Solve - UI & UX Design System

Version: 1.0

Status: Approved

---

# Design Philosophy

Spot & Solve is a modern civic technology platform.

The user interface should feel:

- Modern
- Clean
- Professional
- Friendly
- Trustworthy
- Responsive
- Accessible
- Minimal
- Premium

The application should NOT resemble a traditional government website.

Instead, it should feel like a modern SaaS platform with intuitive interactions and polished visuals.

Every page should prioritize clarity, ease of use, and accessibility.

---

# Design Inspiration

The interface should take inspiration from:

- Linear
- Notion
- Stripe Dashboard
- GitHub
- Vercel Dashboard
- Google Material Design
- Apple Human Interface Guidelines

The goal is to create a professional dashboard experience with smooth interactions and consistent styling.

---

# Color Palette

## Primary

Blue

Purpose:

- Primary Buttons
- Active Links
- Important Actions

Example

#2563EB

---

## Secondary

Green

Purpose

- Success
- Completed Issues
- Verification

Example

#22C55E

---

## Warning

Amber

Purpose

- Pending
- Attention Required

Example

#F59E0B

---

## Danger

Red

Purpose

- Errors
- Reopened Issues
- Delete Actions

Example

#EF4444

---

## Neutral

Gray Scale

Use for

- Background
- Borders
- Text
- Cards

---

# Theme

Default theme:

Light Mode

Future Support:

Dark Mode

The architecture should support dark mode without requiring redesign.

---

# Typography

Font Family

Inter

Fallback

System Sans

---

Heading Sizes

H1

36px

H2

30px

H3

24px

H4

20px

Body

16px

Small Text

14px

Caption

12px

Font Weight

Regular

Medium

Semibold

Bold

Avoid excessive bold text.

---

# Spacing System

Use an 8px spacing scale.

Examples

4px

8px

16px

24px

32px

40px

48px

64px

Maintain generous white space throughout the interface.

Avoid cluttered layouts.

---

# Border Radius

Cards

16px

Buttons

12px

Input Fields

12px

Dialogs

20px

Profile Images

Circular

---

# Shadows

Use subtle shadows.

Avoid harsh or heavy shadows.

Cards should appear elevated without overwhelming the interface.

---

# Icons

Use Lucide React icons.

Icons should be:

- Consistent
- Simple
- Line-based
- Medium weight

Avoid filled icons unless required.

---

# Buttons

Primary Button

Blue Background

White Text

Rounded Corners

Hover Animation

Subtle Shadow

Secondary Button

White Background

Blue Border

Blue Text

Danger Button

Red Background

White Text

Success Button

Green Background

White Text

Disabled Button

Gray Background

Gray Text

Cursor Disabled

---

# Input Fields

Every input should contain

Label

Placeholder

Validation

Error Message

Helper Text (when needed)

Rounded Corners

Soft Border

Focus Ring

Proper Padding

---

# Forms

Forms should:

Display validation immediately.

Clearly indicate required fields.

Show loading indicators during submission.

Prevent duplicate submissions.

Disable submit button while processing.

---

# Cards

Cards should be used extensively.

Examples:

Issue Card

Profile Card

Statistics Card

Notification Card

Category Card

Cards should contain:

Rounded Corners

Padding

Shadow

Hover Effect

Consistent Spacing

---

# Navigation

Top Navigation

Contains:

Logo

Search

Notifications

Profile Menu

Sidebar Navigation

Contains:

Dashboard

Report Issue

Issues

Notifications

Profile

Administrator Sidebar

Contains:

Dashboard

Manage Issues

Categories

Analytics

Settings

Sidebar should collapse automatically on smaller screens.

---

# Dashboard Layout

Desktop

Sidebar + Main Content

Tablet

Collapsible Sidebar

Mobile

Bottom Navigation or Drawer

---

# Issue Cards

Display:

Issue Image

Title

Category

Status Badge

Priority Badge

Location

Vote Count

Created Time

Quick Actions

Hovering over a card should slightly elevate it.

---

# Status Badges

Pending

Amber

Verified

Blue

In Progress

Purple

Resolution Submitted

Cyan

Closed

Green

Reopened

Red

Rejected

Gray

Badges should remain consistent across the application.

---

# Tables

Administrator tables should include:

Sorting

Filtering

Pagination

Search

Responsive Design

Sticky Headers

Hover Highlight

---

# Search

Global search should appear prominently.

Search should provide:

Instant Results

Clear Button

Search Suggestions (Future)

---

# Filters

Filter Panel

Category

Status

Severity

Distance

Date

Votes

Filters should update results without requiring page reload.

---

# Maps

Use:

Leaflet

OpenStreetMap

Features

Current Location

Issue Markers

Marker Clustering

Location Selection

Popup Cards

Directions Button

Map should occupy full available width.

---

# Image Upload

Support

Drag & Drop

Browse Files

Preview Images

Upload Progress

Remove Image

Maximum File Size Indicator

Accepted Formats

---

# Notifications

Notification Card

Title

Message

Timestamp

Read Indicator

Unread notifications should display a colored accent.

---

# Comments

Comment Cards should display:

Avatar

Username

Role

Timestamp

Comment

Administrator comments should have a subtle visual distinction.

---

# Timeline

Timeline should visualize issue progress.

Example

Reported

↓

Verified

↓

In Progress

↓

Completed

↓

Citizen Verified

Each timeline event should include:

Icon

Status

Date

Comment

Administrator Name

---

# Empty States

Every page should include a meaningful empty state.

Examples

No Issues Found

No Notifications

No Search Results

No Comments

Empty states should include:

Illustration

Helpful Message

Call-to-Action Button

---

# Loading States

Never display blank pages.

Use:

Skeleton Loaders

Loading Spinners

Progress Bars

Upload Indicators

---

# Error States

Every error should include:

Clear Message

Retry Button

Supportive Description

Avoid technical jargon.

---

# Animations

Use Framer Motion.

Animations should be:

Smooth

Fast

Subtle

Professional

Examples

Fade In

Slide Up

Scale

Hover Lift

Button Press

Avoid excessive animations.

---

# Accessibility

Follow WCAG Guidelines.

Support:

Keyboard Navigation

Screen Readers

Proper Labels

High Contrast

Visible Focus States

Semantic HTML

---

# Mobile Experience

Every page must be fully responsive.

Touch Targets

Minimum 44px

Large Buttons

Swipe-friendly Layout

Collapsible Navigation

Readable Typography

Fast Loading

---

# Performance

Lazy Load Pages

Lazy Load Images

Code Splitting

Optimized Rendering

Minimal Re-renders

---

# Branding

Application Name

Spot & Solve

Logo Style

Minimal

Modern

Memorable

Use a clean civic-inspired icon with blue and green tones.

---

# Overall User Experience

Every interaction should feel:

Fast

Simple

Professional

Friendly

Intuitive

Transparent

The application should inspire confidence in both citizens and administrators.

Users should immediately understand how to report issues, track progress, and interact with the platform without requiring any training.

---

# Instructions for Antigravity

Generate a consistent design system.

Reuse UI components across all pages.

Maintain identical spacing, typography, colors, and interaction patterns throughout the application.

Never create inconsistent button styles or layouts.

Every page should feel like part of the same product.

The final result should resemble a production-ready civic technology platform rather than a college project.

The interface should be polished enough to showcase in placements, hackathons, and professional portfolios.