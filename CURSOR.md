Build a full-stack web app called **SignalUnion**.

It should include:

---

🎙️ Remix Submission Form
- Fields:
  - artist_name
  - spotify_link
  - track_submission_url (optional)
  - remix_file_url (audio URL)
  - signal_tags (comma separated)
  - contact_email
- POSTs to `/api/submit-remix`

---

🎛 Curator Dashboard
- View submissions from Supabase table `artist_submissions`
- Columns: artist_name, remix_file_url, signal_tags, playlist_assignment
- Buttons:
  - Approve submission
  - Assign to playlist (“Early Buzz FM”, “GrapheneRadio”, “Echo Code”)
- Updates Supabase record via API call

---

🌍 Public Remix Wall (Read-only)
- Lists approved submissions
- Shows:
  - Artist name
  - Tags
  - Optional link to remix track
- Grouped by playlist (section headers: Early Buzz FM, GrapheneRadio, Echo Code)

---

🧱 Stack
- Next.js frontend
- TailwindCSS for styling
- Supabase for data + storage
- Assume `/api/submit-remix` is already implemented

---

Focus on layout, components, and integration wiring.  
I’ll plug in Python for Whisper → Sophia tagging separately.
