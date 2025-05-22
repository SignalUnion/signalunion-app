create table pages_metadata (
  id uuid primary key default uuid_generate_v4(),
  path text unique not null,
  title text not null,
  description text not null,
  og_image_url text
);

insert into pages_metadata (path, title, description, og_image_url) values
('/submit', 'Submit Your Track | SignalUnion', 'Be part of the cultural archive. Submit your music to SignalUnion.', '/og-images/submit.png'),
('/admin/dashboard', 'Admin Dashboard | SignalUnion', 'Moderate and curate community submissions.', '/og-images/admin.png'); 