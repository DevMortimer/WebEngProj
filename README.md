# BULSU COE Web Engineering Project

Multi-group collaboration website with:
[!Vercel](https://ultra-rapi-dfire.vercel.app/)

- Landing page sections assigned per group
- Per-department pages loaded from JSON files in `public/data/`
- Per-department admin editor (`/dept/:deptCode/admin`) with live preview + JSON export
**Live Site:** https://ultra-rapi-dfire.vercel.app/

## Development
A multi-group collaboration website for the Bulacan State University College of Engineering.

```bash
npm install
npm run dev
```
- Landing page with sections assigned per group.
- Per-department pages loaded from data files.
- Per-department admin editors (`/dept/:deptCode/admin`) with live preview and JSON export functionality.

## Build
## Tech Stack

```bash
npm run build
```
- **Framework:** React
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Deployment:** Vercel

## Routes
- `src/`
  - `components/`: Shared React components.
  - `data/`: TypeScript-based content files for the landing page and department data structures.
  - `lib/`: Helper functions for admin pages, data loading, etc.
  - `Pages/`: Main page components for the application routes.
    - `admin/`: Admin editor pages for each department.
- `public/`
  - `data/departments/`: The JSON files that hold the content for each department page. **This is where you will commit your exported JSON.**
- `AGENTS.md`: Strict rules for AI assistant collaboration.

- `/` Landing page
- `/admin` Landing admin editor
- `/departments` Department selector
- `/dept/:deptCode` Department page
- `/dept/:deptCode/admin` Department admin editor
## Available Scripts

## Content Files
In the project directory, you can run:

- Landing: `src/data/landing.ts`
- Departments: `public/data/departments/*.json`
### `npm run dev`

## Collaboration Setup
Runs the app in development mode. Open http://localhost:5173 to view it in the browser. The page will reload if you make edits.

See docs/PROJECT_WORKFLOW.md.
For per-department TSX customization, see docs/DEPARTMENT_PAGE_CUSTOMIZATION.md.
### `npm run build`

Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

Lints the TypeScript/JavaScript files in the project to catch errors and enforce code style.

### `npm run test`

Runs a full check including linting, CSS linting, and a production build to ensure everything is correct before a commit.

### `npm run preview`

Serves the production build from the `dist` folder locally to preview the final app.

## Deployment

This project is configured for continuous deployment on Vercel.

- **Production URL:** https://ultra-rapi-dfire.vercel.app/

Any push to the `main` branch that passes the CI/CD checks will be automatically deployed.

## Content Management

There are two primary ways to manage content:

1.  **Admin Pages (Recommended for Content Editors):**
    -   **Landing Page:** Navigate to `/admin` to edit the main landing page content.
    -   **Department Pages:** Navigate to `/dept/:deptCode/admin` (e.g., `/dept/ME/admin`) to edit a specific department's content.
    -   These pages provide a live preview and allow you to download an updated `.json` file.

2.  **Direct File Edits (For Developers):**
    -   **Landing Page:** Modify the `landingPageData` object in `src/data/landing.ts`.
    -   **Department Data:**
        -   For default structure and non-editable fields, modify the corresponding file in `src/data/department/`.
        -   For live content, update the JSON file in `public/data/departments/`. This is the file you get from the "Download JSON" button in the admin editor.

## Collaboration

For detailed collaboration rules and branch-specific file scopes, please see:

-   **Project Workflow**
-   **AI Agent Rules**
-   **Department Page Customization**
