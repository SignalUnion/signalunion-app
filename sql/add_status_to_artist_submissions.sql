-- Add a status column to artist_submissions with a default value
ALTER TABLE artist_submissions ADD COLUMN status TEXT DEFAULT 'pending';

-- Update the new status column based on the old approved column
-- Assuming approved = TRUE corresponds to 'approved'
UPDATE artist_submissions SET status = 'approved' WHERE approved = TRUE;

-- Assuming approved = FALSE corresponds to 'pending' initially (no change needed from default)
-- UPDATE artist_submissions SET status = 'pending' WHERE approved = FALSE; -- This line is redundant due to the default

-- Drop the old approved column
ALTER TABLE artist_submissions DROP COLUMN approved; 