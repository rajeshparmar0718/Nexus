import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const profileData = req.body;

    const { data, error } = await supabase
      .from('profiles')
      .upsert(profileData, { onConflict: 'email' }); // Ensure 'email' is a single string, not an array

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

