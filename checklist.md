# SignalUnion OG Metadata Checklist

This checklist confirms that OG metadata support in the SignalUnion app is complete, with optional enhancements noted for future consideration.

---

## ✅ Core Implementation

- [x] `app/(meta)/layout.tsx` exists for shared layout metadata
- [x] `app/(meta)/opengraph-image.tsx` provides dynamic OG image generation
- [x] `app/(meta)/twitter-image.tsx` handles Twitter card images
- [x] `lib/og.ts` provides reusable helpers for metadata rendering (now `lib/og.tsx`)
- [x] `lib/site.ts` contains centralized site-wide metadata (e.g. title, baseUrl)
- [x] `next.config.js` is present for runtime support (assumed)
- [x] `vercel.json` is present (likely for content-type and header handling) (assumed)

**Note:** While the core files for the App Router metadata system are in place, the full integration of dynamic metadata logic (database, config, tag-based images) is ongoing, particularly within the `opengraph-image.tsx` and `twitter-image.tsx` files.

---

## 🧠 Optional Enhancements

- [ ] Use `generateMetadata()` in dynamic routes to set OG per page
- [ ] Add fallback OG image for robustness (partially implemented via default in siteConfig)
- [ ] Add `Cache-Control` headers for OG routes (e.g. 24h caching)
- [ ] Validate appearance using:
  - https://metatags.io/
  - https://cards-dev.twitter.com/validator

---

## ✅ Action

Once dynamic metadata is confirmed live on production routes, this file can be deleted.

Okay, I have deleted the old app/components/MetaHead.tsx component.
With the creation of the app/(meta) layout and image files, the addition of generateMetadata to app/src/app/submit/page.tsx, and the confirmation of the correct import paths for the lib files, we have made significant progress in transitioning to the App Router metadata conventions.
Here's a summary of where we are with respect to your checklist and the App Router metadata approach:
✅ Core Implementation:
app/(meta)/layout.tsx exists for shared layout metadata (Created, basic implementation with site defaults).
app/(meta)/opengraph-image.tsx provides dynamic OG image generation (Created, basic implementation).
app/(meta)/twitter-image.tsx handles Twitter card images (Created, basic implementation).
lib/og.ts provides reusable helpers for metadata rendering (Created, now lib/og.tsx).
lib/site.ts contains centralized site-wide metadata (Created).
next.config.js is present for runtime support (Presumably exists in your project, but we haven't interacted with it).
vercel.json is present (Presumably exists in your project, but we haven't interacted with it).
Progress on Integrating Previous Logic:
The logic for fetching metadata from the Supabase database (usePageMeta) and metaConfig has been integrated into the generateMetadata function of app/src/app/submit/page.tsx. This pattern can be replicated for other pages where specific metadata is needed.
The tag-based image logic using tagToImageMap is also partially integrated into the generateMetadata of submit/page.tsx by checking search parameters.
Remaining Tasks and Considerations:
Full Integration of Image Logic in opengraph-image.tsx: The opengraph-image.tsx and twitter-image.tsx files currently generate basic images. We need to enhance these to fully utilize the database metadata (og_image_url), the tag-based fallback (tagToImageMap), and potentially render more complex image overlays with text (like title and description) as the original description suggested. This might involve passing data to these image files via URL parameters or other mechanisms if they need data beyond what's available from the route segments.
Implementing generateMetadata for Other Pages: You'll need to add generateMetadata functions to other pages in your application where you want to set specific metadata, following the pattern established in app/src/app/submit/page.tsx.
Review and Refine lib/og.tsx: The lib/og.tsx file can be further developed to contain more sophisticated image generation logic or helper functions that can be used by opengraph-image.tsx and twitter-image.tsx.
Testing: Thoroughly test the metadata and OG images on various pages, including those with and without specific database entries or tags, and validate their appearance using tools like metatags.io and the Twitter Card Validator.
Cleanup: Remove any remaining unused files or code related to the old MetaHead component approach (besides the lib files which are now being used by the new system).
We have successfully set up the basic App Router metadata structure and integrated the core logic into one example page. The main remaining part of this phase is to fully flesh out the image generation in opengraph-image.tsx and twitter-image.tsx to handle all the fallback scenarios and potentially more complex image rendering.
Would you like to proceed with enhancing opengraph-image.tsx and twitter-image.tsx to fully implement the dynamic image logic?