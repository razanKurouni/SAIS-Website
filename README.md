# SAIS Next.js Frontend

Responsive SAIS homepage built with Next.js, TypeScript, Tailwind CSS, and Sanity CMS.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Sanity Content Lake (`@sanity/client`)

## Run locally

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sanity config

`.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=9oxycbmd
NEXT_PUBLIC_SANITY_DATASET=production
```

## Homepage CMS

- The maintainable homepage model is defined in `sanity/schemas/homepage.js`.
- Reusable object schemas live in `sanity/schemas/objects/`.
- The frontend first looks for a structured `homepage` document.
- If no `homepage` document exists yet, it falls back to older `homeSection` documents so the live site keeps working while content is migrated.
