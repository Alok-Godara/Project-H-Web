import { createClient } from '@supabase/supabase-js'

const supabaseUrl = String(import.meta.env.VITE_SUPABASE_URL);
const supabaseKey = String(import.meta.env.VITE_SUPABASE_API);

console.log('Supabase configuration:', {
  url: supabaseUrl,
  key: supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'NOT SET'
});

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey)

console.log('Supabase client created successfully');
