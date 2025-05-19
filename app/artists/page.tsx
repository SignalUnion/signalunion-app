import { supabase } from '../src/lib/supabase';

export default async function ArtistsPage() {
  const { data: artists, error } = await supabase
    .from('artist_submissions')
    .select('artist_name')
    .eq('approved', true);

  if (error) {
    console.error('Error fetching artists:', error);
    return <div>Error loading artists.</div>;
  }

  return (
    <div>
      <h1>Approved Artists</h1>
      {
        artists && artists.length > 0 ? (
          <ul>
            {artists.map((artist) => (
              <li key={artist.artist_name}>{artist.artist_name}</li>
            ))}
          </ul>
        ) : (
          <p>No approved artists found.</p>
        )
      }
    </div>
  );
} 