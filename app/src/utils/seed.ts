import { supabase } from '@/lib/supabase';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local or .env
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const dummySubmissions = [
  {
    artist_name: 'Synthwave Sam',
    spotify_link: 'https://open.spotify.com/artist/dummysam',
    track_submission_url: 'https://soundcloud.com/dummysam/track1',
    remix_file_url: 'https://drive.google.com/file/sam_track1',
    signal_tags: ['synthwave', '80s', 'retro'],
    contact_email: 'sam@example.com',
    approved: true,
    playlist_assignment: 'Early Buzz FM',
  },
  {
    artist_name: 'Ambient Anna',
    spotify_link: 'https://open.spotify.com/artist/dummyanna',
    track_submission_url: null,
    remix_file_url: 'https://drive.google.com/file/anna_ambient',
    signal_tags: ['ambient', 'drone', 'meditative'],
    contact_email: 'anna@example.com',
    approved: true,
    playlist_assignment: 'GrapheneRadio',
  },
  {
    artist_name: 'Resistance Rex',
    spotify_link: 'https://open.spotify.com/artist/dummyrex',
    track_submission_url: 'https://youtube.com/watch?v=dummyrex',
    remix_file_url: 'https://dropbox.com/rex_resistance',
    signal_tags: ['resistance', 'industrial', 'noise'],
    contact_email: 'rex@example.com',
    approved: false,
    playlist_assignment: null,
  },
];

async function seedDatabase() {
  console.log('Seeding database with dummy data...');

  // Optional: Clear existing data before seeding
  // console.log('Clearing existing artist_submissions data...');
  // const { error: deleteError } = await supabase
  //   .from('artist_submissions')
  //   .delete()
  //   .neq('id', '00000000-0000-0000-0000-000000000000'); // Simple way to delete all rows

  // if (deleteError) {
  //   console.error('Error clearing data:', deleteError.message);
  //   return;
  // }
  // console.log('Existing data cleared.');

  console.log('Inserting dummy data...');
  const { data, error } = await supabase
    .from('artist_submissions')
    .insert(dummySubmissions)
    .select(); // Select the inserted data to confirm

  if (error) {
    console.error('Error inserting data:', error.message);
  } else {
    console.log('Successfully inserted data:', data);
    console.log(`Inserted ${data.length} records into artist_submissions.`);
  }

  console.log('Database seeding complete.');
  // Exit the script
  process.exit(0);
}

seedDatabase(); 