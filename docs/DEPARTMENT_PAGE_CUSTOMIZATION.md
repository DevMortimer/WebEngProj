# Department Page Customization Guide

Each department has its own full page file:

- `src/Pages/departments/CE.tsx`
- `src/Pages/departments/CPE.tsx`
- `src/Pages/departments/ECE.tsx`
- `src/Pages/departments/EE.tsx`
- `src/Pages/departments/IE.tsx`
- `src/Pages/departments/MFE.tsx`
- `src/Pages/departments/ME.tsx`
- `src/Pages/departments/MEE.tsx`

## Add a Custom Section

Edit your own department file directly and add a new `<section>` block.

Example (`CE.tsx`):

```tsx
export default function CEPage() {
  // ... existing code

  return (
    <div className="bg-white">
      {/* existing sections */}

      <section id="ce-custom" className="max-w-6xl mx-auto px-6 pt-16">
        <h2 className="text-2xl font-bold">CE Custom Section</h2>
        <p className="mt-2 text-sm text-gray-600">Your section content here.</p>
      </section>

      {/* existing sections continue */}
    </div>
  );
}
```

## Keep Scope Clean

- Edit only your own department TSX file.
- Edit only your own JSON file in `public/data/departments/<CODE>.json`.
- Do not modify other departments' TSX/JSON files.
