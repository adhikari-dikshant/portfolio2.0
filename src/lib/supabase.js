import { createClient } from "@supabase/supabase-js";

// Public client — used for reads in server components
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Admin client — used in API routes for all write operations
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

/*
  Supabase SQL to run in your project's SQL editor:

  CREATE TABLE snippets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    tags TEXT[] DEFAULT '{}',
    html TEXT DEFAULT '',
    css TEXT DEFAULT '',
    js TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  ALTER TABLE snippets ENABLE ROW LEVEL SECURITY;

  -- Allow anyone to read snippets (for the playground page)
  CREATE POLICY "Public read" ON snippets
    FOR SELECT USING (true);
*/
