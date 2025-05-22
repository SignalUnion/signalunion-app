# ✨ SignalUnion – Final OG Metadata Implementation Instructions

These are the final implementation steps needed to fully complete the dynamic Open Graph image support and metadata system for the SignalUnion app.

---

## ✅ Overview

The project is already structured correctly with:

- Core App Router metadata files (`layout.tsx`, `opengraph-image.tsx`, `twitter-image.tsx`)
- A working example of `generateMetadata()` in `submit/metadata.ts`
- Legacy `MetaHead.tsx` removed
- Basic OG image rendering in place

This handoff outlines what remains to fully implement the intended dynamic metadata flow and wrap up the task.

---

## 🔧 Goals to Complete

### 1. **Finalize Dynamic OG Image Generation**

- Enhance `/api/og-image/route.ts` to:
  - Accept `title`, `tags`, and optionally `description` via query string
  - Use `tagToImageMap` to pick background assets
  - Return an `ImageResponse` with text overlays (e.g. title)
  - Include fallback if title/tags are missing

> This replaces the need to dynamically generate images in `app/(meta)/opengraph-image.tsx` directly.

---

### 2. **Update `generateMetadata()` in Each Page**

- For each top-level page (e.g. `/submit`, `/artists/[slug]` if applicable):
  - Move `generateMetadata()` to `metadata.ts` (if not already)
  - Construct the `openGraph.images` and `twitter.images` array like:

```ts
openGraph: {
  title: pageTitle,
  images: [`/api/og-image?title=${encodedTitle}&tags=${tagString}`]
},
twitter: {
  card: "summary_large_image",
  title: pageTitle,
  images: [`/api/og-image?title=${encodedTitle}&tags=${tagString}`]
}
```

---

### 3. **Keep `app/(meta)/opengraph-image.tsx` as a fallback**

- This can serve a static image with site-level branding.
- Accept optional `title` via URL params (if needed), or leave as default.

---

### 4. **Validate and Test**

- Use [metatags.io](https://metatags.io) and [Twitter Card Validator](https://cards-dev.twitter.com/validator) to confirm metadata behavior.
- Check pages both with and without dynamic metadata entries.

---

## 🧼 Cleanup

- Remove any remaining references to the old `MetaHead` system (already mostly done).
- Delete `checklist.md` once all items are confirmed.

---

Let me know if you'd like an optional enhancement to include caching headers for OG image routes or structured fallback font loading within `ImageResponse`.

