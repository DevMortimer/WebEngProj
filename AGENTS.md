# AGENTS.md

Strict operating rules for AI coding assistants in this repository.

## 1) Non-Negotiable Scope Rule

AI assistants must edit only the files owned by the current branch scope.
If asked to modify out-of-scope files, stop and respond: "Out of scope for this branch."

## 2) Determine Scope From Branch

Always check branch first:

```bash
git branch --show-current
```

Then apply the rules below.

## 3) Allowed Files Per Branch

### `landing/hero`
Allowed files:
- `public/data/landing/hero.json`
- `public/` assets used by hero only

### `landing/mission-vision`
Allowed files:
- `public/data/landing/mission-vision.json`
- `public/` assets used by mission/vision only

### `landing/department-grid`
Allowed files:
- `public/data/landing/department-grid.json`
- `public/` assets used by department grid only

### `landing/news`
Allowed files:
- `public/data/landing/news.json`
- `public/` assets used by news only

### `landing/facilities`
Allowed files:
- `public/data/landing/facilities.json`
- `public/` assets used by facilities only

### `landing/statistics`
Allowed files:
- `public/data/landing/statistics.json`
- `public/` assets used by statistics only

### `landing/contact`
Allowed files:
- `public/data/landing/contact.json`
- `public/` assets used by contact only

### `landing/footer`
Allowed files:
- `public/data/landing/footer.json`
- `public/` assets used by footer only

### `dept/<CODE>` where `<CODE>` is one of `CE CPE ECE EE IE MFE ME MEE`
Allowed files:
- `public/data/departments/<CODE>.json`
- `public/departments/<CODE>/...`
- `src/Pages/departments/<CODE>.tsx`

Forbidden for all `dept/*` branches:
- Any other department JSON files
- Any other `src/Pages/departments/*.tsx` files
- `src/Pages/LandingPage.tsx`
- `src/App.tsx`
- Shared infrastructure/docs unless maintainer explicitly requests

## 4) Ownership Map (Landing)

- Hero: Gapac, Ryan Joshua
- Mission & Vision: Roxas, Aiam Airron L
- Department Grid: Pagdanganan, Arviella S
- News: Dela Cruz, Richter Vhon C
- Facilities: Jones, Colleen Iris P
- Statistics: Pascual, Alyssa S.
- Contact: Pagayunan, Lhara Mei R
- Footer: Villareal, Trisha Mae

AI assistants must not edit sections owned by others.

## 5) Mandatory Pre-Commit Guard

Before every commit, run:

```bash
git diff --name-only --cached
```

If any staged file is outside allowed scope, unstage it and stop.
No mixed-scope commits.

## 6) Editing Policy

- Keep commits small and single-purpose.
- Prefer content JSON edits over shared code edits.
- Do not run whole-file formatting when only one owned JSON file is assigned.
- Do not rename or move files outside branch scope.

## 7) If Scope Is Unclear

Do not edit. Ask one clarification question and wait.
