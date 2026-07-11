# FEATURES.md

# Spot & Solve - Functional Features Specification

Version: 1.0

Status: Approved

---

# Introduction

This document describes all functional features of the Spot & Solve platform.

Every feature listed here represents a real requirement that should be implemented in the application.

The platform has two primary user roles:

- Citizen
- Administrator

Every feature should be designed with usability, scalability, security, and transparency in mind.

---

# User Roles

## Citizen

A citizen can:

- Register
- Login
- Logout
- Report civic issues
- Upload images
- View nearby issues
- Search issues
- Filter issues
- Upvote issues
- Track issue progress
- Receive notifications
- Verify completed work
- Edit their own issues
- Comment on issues
- Manage profile

---

## Administrator

An administrator can:

- Login
- Logout
- View all issues
- Filter issues
- Update issue status
- Upload after-resolution images
- Add progress updates
- Comment on issues
- Manage categories
- View analytics
- Send notifications

---

# Authentication Module

## User Registration

Users should register using:

- Full Name
- Email Address
- Password

Supabase Authentication should manage account creation.

After successful registration:

- User profile is automatically created.
- Session starts immediately.
- User is redirected to the dashboard.

---

## User Login

Users login using:

- Email
- Password

Successful login redirects users to their respective dashboard based on their role.

---

## Logout

Users can securely logout.

Session should be destroyed.

Protected pages should become inaccessible.

---

## Session Persistence

Users should remain logged in after refreshing the browser until they explicitly logout.

---

# Profile Module

Every user has one profile.

Users can:

- View profile
- Edit profile
- Upload profile picture
- Update locality

Administrators may also manage their profile.

---

# Dashboard Module

After login, users should see:

- Welcome section
- Nearby issues
- Trending issues
- Recently reported issues
- Statistics
- Quick actions

Administrators should see:

- Total issues
- Pending issues
- Issues in progress
- Closed issues
- User statistics
- Recent activities

---

# Issue Reporting Module

Users can report new civic issues.

Required information:

- Title
- Category
- Location
- Image

Optional:

- Description

The application should automatically capture:

- Latitude
- Longitude
- Address

Each issue begins with:

Pending

---

# Duplicate Detection

Before creating a new issue:

The application checks for existing issues within a nearby radius.

If similar issues exist:

Display:

"This issue may already exist nearby."

Options:

- Upvote Existing Issue
- Report Anyway

This reduces duplicate complaints.

---

# Image Upload Module

Users may upload one or more images.

Images should be uploaded to Supabase Storage.

The application stores only image URLs.

Administrators can upload:

- After images

to demonstrate completed work.

---

# Issue Details Module

Every issue should have its own detail page.

Display:

- Title
- Description
- Category
- Status
- Severity
- Priority
- Images
- Location
- Timeline
- Comments
- Vote count

---

# Map Integration

The application should integrate:

Leaflet + OpenStreetMap.

Features:

- Display issue locations
- Display user location
- Click map to report issue
- Navigate to issue location

---

# Search Module

Users should search issues by:

- Title
- Category
- Address
- Keywords

Search should update results instantly.

---

# Filter Module

Users should filter by:

- Status
- Category
- Severity
- Date
- Distance
- Most Upvoted
- Recently Added

---

# Voting Module

Users may support an issue by upvoting it.

Rules:

One user

↓

One vote

↓

Per issue

Users may also remove their vote.

Vote count should update immediately.

---

# Issue Editing

Users may edit their issue only when:

Status:

- Pending
- Verified

Editing becomes unavailable once work begins.

---

# Issue Timeline

Every issue contains a timeline.

Examples:

Reported

↓

Verified

↓

In Progress

↓

Repair Started

↓

Completed

↓

Citizen Verified

Users should always know the current stage of an issue.

---

# Comments Module

Both users and administrators may comment.

Comments should:

- Display newest last
- Show author
- Show timestamp
- Support multiline text

Comments should remain professional and relevant to the issue.

---

# Notifications Module

Users receive notifications for:

- Status changes
- New comments
- Resolution submitted
- Citizen verification request
- System announcements

Unread notifications should display a badge.

---

# Citizen Verification Module

When administrators submit a completed issue:

The citizen receives a notification.

Citizen chooses:

Accept Resolution

or

Reject Resolution

If accepted:

Issue becomes Closed.

If rejected:

Issue becomes Reopened.

---

# Category Module

Administrators manage categories.

Citizens may only select existing categories.

Example categories:

- Garbage
- Roads
- Water Leakage
- Drainage
- Street Lights
- Electricity
- Public Safety

---

# Administrator Dashboard

The administrator dashboard should display:

- Total users
- Total issues
- Pending issues
- Resolved issues
- Reopened issues
- Category statistics
- Trending problems

Charts should be interactive.

---

# Issue Management

Administrators can:

- Verify issues
- Change status
- Assign priority
- Upload completion images
- Add progress updates
- View comments

---

# Analytics Module

Administrators should view:

- Issues by category
- Issues by locality
- Monthly reports
- Resolution time
- Most active areas
- Most upvoted issues

---

# Responsive Design

Every feature must function on:

- Desktop
- Laptop
- Tablet
- Mobile

---

# Accessibility

The application should:

- Support keyboard navigation
- Use semantic HTML
- Maintain proper color contrast
- Display visible focus indicators

---

# Loading States

Every asynchronous operation should display:

- Skeleton loaders
- Progress indicators
- Upload progress
- Empty states
- Error states

---

# Security Features

Users must never access unauthorized data.

Protected routes should require authentication.

Sensitive operations should require valid sessions.

Supabase Row Level Security should enforce permissions.

---

# Future Features

The architecture should support future implementation of:

- AI Duplicate Detection
- AI Severity Prediction
- AI Image Classification
- Department Assignment
- Push Notifications
- Progressive Web App (PWA)
- Real-Time Updates
- Dark Mode
- Multi-Language Support
- Public Issue Dashboard
- Leaderboards
- Offline Reporting
- QR Code Issue Sharing

---

# Functional Workflow

Citizen

↓

Login

↓

Dashboard

↓

Report Issue

↓

Duplicate Detection

↓

Issue Created

↓

Administrator Verification

↓

Progress Updates

↓

Resolution Submitted

↓

Citizen Verification

↓

Issue Closed

---

# Success Criteria

The application should provide:

- Fast issue reporting
- Transparent issue tracking
- Community participation
- Professional administrator tools
- Secure authentication
- Responsive experience
- Production-ready architecture
- Excellent user experience