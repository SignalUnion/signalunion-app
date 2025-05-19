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

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

1.  **Clone the repository:**

    ```bash
    git clone [repository_url]
    cd signalunion-app
    ```
    Replace `[repository_url]` with the actual URL of this repository.

2.  **Install dependencies:**

    Navigate to the project root and install root dependencies (for scripts like seeding):

    ```bash
    npm install
    ```

    Then, navigate into the `app` directory and install Next.js application dependencies:

    ```bash
    cd app
    npm install
    cd ..
    ```

3.  **Set up Environment Variables:**

    Create a `.env.local` file in the **root** directory of the project (where this README is located). Add your Supabase credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
    Replace `your_supabase_url` and `your_supabase_anon_key` with your actual Supabase project URL and public anon key.

4.  **Seed the Database (Optional):**

    You can seed the database with dummy data using the provided script. Ensure you are in the project root directory.

    ```bash
    npx tsc scripts/seed.ts && node scripts/seed.js
    ```

5.  **Run the Development Server:**

    Navigate to the `app` directory and start the Next.js development server:

    ```bash
    cd app
    npm run dev
    ```

    The application should now be running at `http://localhost:3000`.

---

### 🏗 Building and Running in Production

To build the application for production and run it:

1.  **Build the application:**

    Navigate to the `app` directory and build the project. This creates an optimized build in the `.next` directory.

    ```bash
    cd app
    npm run build
    ```

2.  **Start the production server:**

    From the `app` directory, start the server using the built files:

    ```bash
    npm start
    ```

    The application will be served from `http://localhost:3000`.

---

> Built for: GrapheneRadio, Early Buzz FM, Sophia remixers, and decentralized listeners.

MIT licensed — remix the remix.

