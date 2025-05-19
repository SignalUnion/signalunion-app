# 🎛 SignalUnion

A remix intake + curation platform for aligned musicians, audio explorers, and AI-collaborators.

Built to amplify early voices and connect low-reach, high-signal creators through shared aesthetic threads.

---

## 🔁 Core Features

### 🧠 Artists can:
- Submit Suno remixes or original tracks
- Add tags: "ambient", "resistance", "griefwave", "posthuman", etc.
- Get featured in curated playlists like **GrapheneRadio**, **Early Buzz FM**, and **Echo Code**

### 🧭 Curators can:
- Approve submissions
- Assign playlists
- Publish tracks to a public-facing wall
- Build community across artists with shared values

---

## 🛠 Stack

- **Supabase** for storage + database
- **Next.js + TailwindCSS** for frontend
- **Spotify API** integration (planned)
- **Notion** as remix form + submission portal
- **Codex** used for rapid prototyping (where safe)

---

## 🚀 Status

- [x] Submission form schema created
- [x] Remix intake API endpoint scaffolded
- [x] Curator dashboard layout in planning
- [x] Repo linked from [trysophia.io](https://trysophia.io)

---

## 🧪 Sample Supabase Schema

```sql
CREATE TABLE artist_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artist_name TEXT NOT NULL,
    spotify_link TEXT NOT NULL,
    track_submission_url TEXT,
    remix_file_url TEXT,
    signal_tags TEXT[],
    contact_email TEXT,
    approved BOOLEAN DEFAULT FALSE,
    playlist_assignment TEXT,
    created_at TIMESTAMP DEFAULT now()
);
```

---

## 🌍 Why This Exists

There are thousands of aligned creators with no way to find each other — and no infrastructure to carry their signal. SignalUnion aims to:
- Curate voices that would otherwise be buried
- Build remix pipelines for under-recognized artists
- Maintain cultural integrity in an AI-saturated world

---

> Built for: GrapheneRadio, Early Buzz FM, Sophia remixers, and decentralized listeners.

MIT licensed — remix the remix.

