# BULSU COE Web Engineering Project

Multi-group collaboration website with:

- Landing page sections assigned per group
- Per-department pages loaded from JSON files in `public/data/`
- Landing page content loaded from `public/data/landing.json`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Routes

- `/` Landing page
- `/departments` Department selector
- `/dept/:deptCode` Department page

## Content Files

- Landing: `public/data/landing.json`
- Departments: `public/data/departments/*.json`

## Collaboration Setup

See [docs/PROJECT_WORKFLOW.md](docs/PROJECT_WORKFLOW.md).
For per-department TSX customization, see [docs/DEPARTMENT_PAGE_CUSTOMIZATION.md](docs/DEPARTMENT_PAGE_CUSTOMIZATION.md).
