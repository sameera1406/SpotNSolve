# DATABASE.md

# Spot & Solve Database Specification

Version: 1.0

Status: Approved

Database: Supabase PostgreSQL

Storage: Supabase Storage

---

# Purpose

This document defines the complete database architecture for the Spot & Solve platform.

The database is designed to be:

- Normalized
- Scalable
- Secure
- Easy to maintain
- Ready for Supabase Authentication
- Ready for Row Level Security (RLS)
- Suitable for production deployment

Every table in this document exists because a real application feature requires it.

No unnecessary tables should be created.

---

# Database Overview

```
                 Supabase Auth
                 (auth.users)
                       │
                       ▼
                  Profiles
                       │
        ┌──────────────┼───────────────┐
        ▼              ▼               ▼
    Issues      Notifications      Comments
        │
 ┌──────┼─────────────┬──────────────┐
 ▼      ▼             ▼              ▼
Votes Issue Updates Issue Images Categories
```

---

# Tables

1. profiles

2. categories

3. issues

4. issue_images

5. votes

6. issue_updates

7. comments

8. notifications

---

# Storage

Supabase Storage Bucket

```
issue-images
```

Stores

- Before images
- After images

---

# Authentication

Authentication is completely managed by Supabase Auth.

The application should never store passwords.

Supabase automatically stores

- Email
- Password
- Sessions

The application stores only profile information.

---

# Table 1

## profiles

Purpose

Stores application-specific user information.

Authentication information is NOT stored here.

---

Columns

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Same as auth.users.id |
| full_name | TEXT | User display name |
| email | TEXT | User email |
| role | TEXT | user / admin |
| avatar_url | TEXT | Profile image |
| locality | TEXT | Ward or locality |
| created_at | TIMESTAMP | Account created |
| updated_at | TIMESTAMP | Last updated |

---

Relationships

```
profiles.id

↓

auth.users.id
```

Foreign Key

```
profiles.id

→ auth.users.id
```

---

Business Rules

Every authenticated user has exactly one profile.

A profile cannot exist without an authenticated user.

Role defaults to

```
user
```

---

# Table 2

## categories

Purpose

Stores predefined issue categories.

Avoids storing category names repeatedly.

---

Columns

| Column | Type |
|---------|------|
| id | UUID |
| name | TEXT |
| icon | TEXT |
| color | TEXT |

---

Initial Categories

- Garbage
- Roads
- Potholes
- Water Leakage
- Drainage
- Street Lights
- Electricity
- Public Safety

---

Relationship

```
categories.id

↓

issues.category_id
```

---

Business Rules

Administrators may add new categories.

Citizens cannot.

---

# Table 3

## issues

Purpose

Stores every civic complaint.

This is the core table of the system.

---

Columns

| Column | Type |
|---------|------|
| id | UUID |
| title | TEXT |
| description | TEXT |
| category_id | UUID |
| severity | TEXT |
| status | TEXT |
| priority_score | INTEGER |
| latitude | DOUBLE PRECISION |
| longitude | DOUBLE PRECISION |
| address | TEXT |
| created_by | UUID |
| resolved_by | UUID |
| citizen_verified | BOOLEAN |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |
| resolved_at | TIMESTAMP |

---

Severity Values

- Low
- Medium
- High
- Critical

---

Status Values

- Pending
- Verified
- In Progress
- Resolution Submitted
- Closed
- Reopened
- Rejected

---

Relationships

```
profiles.id

↓

issues.created_by
```

```
profiles.id

↓

issues.resolved_by
```

```
categories.id

↓

issues.category_id
```

---

Business Rules

Every issue belongs to one category.

Every issue has one creator.

Every issue has GPS coordinates.

Every issue starts with

```
Pending
```

Citizen verification defaults to

```
false
```

Priority Score is calculated by the application.

---

# Table 4

## issue_images

Purpose

Allows multiple images for every issue.

Supports

- Before images
- After images

---

Columns

| Column | Type |
|---------|------|
| id | UUID |
| issue_id | UUID |
| image_url | TEXT |
| is_before | BOOLEAN |
| uploaded_by | UUID |
| uploaded_at | TIMESTAMP |

---

Relationships

```
issues.id

↓

issue_images.issue_id
```

```
profiles.id

↓

uploaded_by
```

---

Business Rules

One issue may contain multiple images.

Images are stored in Supabase Storage.

Only URLs are stored in the database.

---

# Table 5

## votes

Purpose

Stores community upvotes.

---

Columns

| Column | Type |
|---------|------|
| id | UUID |
| issue_id | UUID |
| user_id | UUID |
| created_at | TIMESTAMP |

---

Relationships

```
issues.id

↓

votes.issue_id
```

```
profiles.id

↓

votes.user_id
```

---

Business Rules

One user

↓

One vote

↓

Per issue

Duplicate voting is not allowed.

Vote count is determined by counting rows.

---

# Table 6

## issue_updates

Purpose

Stores issue progress history.

Every status change creates one record.

---

Columns

| Column | Type |
|---------|------|
| id | UUID |
| issue_id | UUID |
| updated_by | UUID |
| status | TEXT |
| comment | TEXT |
| estimated_completion | TIMESTAMP |
| created_at | TIMESTAMP |

---

Example Timeline

```
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

Citizen Approved
```

---

Relationships

```
issues.id

↓

issue_updates.issue_id
```

---

Business Rules

Updates cannot be deleted.

Timeline remains permanent.

---

# Table 7

## comments

Purpose

Allows communication between citizens and administrators.

---

Columns

| Column | Type |
|---------|------|
| id | UUID |
| issue_id | UUID |
| user_id | UUID |
| comment | TEXT |
| created_at | TIMESTAMP |

---

Relationships

```
issues.id

↓

comments.issue_id
```

```
profiles.id

↓

comments.user_id
```

---

Business Rules

Both citizens and administrators may comment.

Comments are ordered chronologically.

---

# Table 8

## notifications

Purpose

Stores application notifications.

---

Columns

| Column | Type |
|---------|------|
| id | UUID |
| user_id | UUID |
| issue_id | UUID |
| type | TEXT |
| title | TEXT |
| message | TEXT |
| is_read | BOOLEAN |
| created_at | TIMESTAMP |

---

Notification Types

- STATUS_UPDATE
- COMMENT
- RESOLUTION
- SYSTEM

---

Business Rules

Notifications are never deleted automatically.

Users can mark notifications as read.

---

# Row Level Security (Planned)

Profiles

Users can

- Read their own profile
- Update their own profile

Administrators

- Read all profiles

---

Issues

Users can

- Read all issues
- Create issues
- Update only their own issues (before work begins)

Administrators

- Read all
- Update all

---

Votes

Users can

- Create one vote
- Delete their own vote

---

Comments

Users can

- Create comments
- Read comments

---

Notifications

Users

- Read only their own notifications

---

Categories

Everyone

- Read

Administrators

- Create
- Update
- Delete

---

# Storage

Bucket

```
issue-images
```

Rules

Users upload issue images.

Administrators upload resolution images.

Images remain linked through the issue_images table.

---

# Future Database Enhancements

The schema is intentionally designed to support future features without major restructuring.

Possible future additions include:

- AI duplicate detection
- AI severity prediction
- Department assignments
- Real-time notifications
- Leaderboards
- Offline synchronization
- Audit logs
- Activity history
- Public dashboards
- GIS heatmaps

---

# Database Design Principles

This database follows the following principles:

- Third Normal Form (3NF)
- No duplicated information
- Clear relationships
- UUID primary keys
- Foreign key constraints
- Secure authentication through Supabase
- Scalable architecture
- Production-ready design
- Easy maintenance
- Feature-driven schema
