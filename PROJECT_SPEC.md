# AI_PROJECT_SPEC.md

# Spot & Solve

## Objective
Continue the existing project. Complete the Supabase integration without changing the application's UI, architecture, or user experience.

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Supabase

---

## Existing Backend

Supabase is already configured.

### Tables
- profiles
- categories
- issues
- comments
- votes

### Storage
- issue-images

### Migrations
- 001_initial_schema.sql
- 002_rls_policies.sql
- 003_seed_categories.sql
- 004_storage.sql
- 005_indexes.sql
- 006_triggers.sql

Authentication, role-based login, protected routes, and routing are already implemented.

---

## Project Rules

Do **NOT**:

- redesign the UI
- change layouts
- modify styling
- rename files
- rename components
- change routing
- replace Context API
- rewrite working code
- introduce unnecessary libraries

Only modify code required for Supabase integration and bug fixes.

---

## Architecture

Database logic belongs inside:

```
src/services/
```

Examples:

- categoryService
- issueService
- commentService
- voteService

Components should contain presentation logic only.

---

## Integration Order

Complete these features in order:

1. Categories
2. Report Issue
3. Home Feed
4. Dashboard
5. Comments
6. Votes
7. Admin Dashboard

Replace every dummy/local data source with Supabase.

---

## Error Handling

If any issue is encountered:

- TypeScript
- Runtime
- Supabase
- RLS
- Storage
- SQL
- Trigger
- Migration

identify the root cause, generate the required fix (including SQL if needed), apply it, and continue implementation automatically.

Do not stop after fixing a single error.

---

## Completion Criteria

The project is complete only when:

- Builds successfully
- Runs without runtime errors
- Uses Supabase for all application data
- No dummy/mock data remains
- Existing UI is unchanged
- Existing routes are unchanged
- Existing authentication continues to work
- Code is production-ready