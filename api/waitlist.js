import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const getSupabase = () => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase configuration: SUPABASE_URL and SUPABASE_ANON_KEY are required.');
    }

    return createClient(supabaseUrl, supabaseKey);
};

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const supabase = getSupabase();

        // GET - Retrieve all waitlist entries
        if (req.method === 'GET') {
            const { data, error } = await supabase
                .from('waitlist')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            return res.status(200).json({
                success: true,
                count: data.length,
                data: data,
                storage: 'supabase'
            });
        }

        // POST - Add new entry to waitlist
        if (req.method === 'POST') {
            // Robust body parsing
            let body = req.body;
            if (typeof body === 'string') {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    return res.status(400).json({ error: 'Invalid JSON body' });
                }
            }

            if (!body) {
                return res.status(400).json({ error: 'Missing request body' });
            }

            const { name, email, category, categoryLabel, categorySpecific, linkedinId } = body;

            // Validation
            if (!name || !email || !category || !categoryLabel) {
                return res.status(400).json({
                    error: 'Missing required fields: name, email, category, categoryLabel'
                });
            }

            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

            // Insert into Supabase
            // Note: Supabase handles unique email constraints if set in DB
            const { data, error } = await supabase
                .from('waitlist')
                .insert([
                    {
                        name,
                        email,
                        category,
                        category_label: categoryLabel, // Map to snake_case column
                        category_specific: categorySpecific || null,
                        linkedin_id: linkedinId || null
                        // created_at is handled by default in Postgres
                    }
                ])
                .select();

            if (error) {
                // Handle unique constraint violation (error code 23505 for Postgres)
                if (error.code === '23505') {
                    return res.status(409).json({ error: 'This email is already on the waitlist' });
                }
                throw error;
            }

            return res.status(201).json({
                success: true,
                message: 'Successfully added to waitlist',
                id: data[0]?.id,
                storage: 'supabase'
            });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Waitlist API Error:', error);

        return res.status(500).json({
            error: 'Internal server error',
            message: error.message,
            env: {
                hasUrl: !!process.env.SUPABASE_URL,
                hasKey: !!process.env.SUPABASE_ANON_KEY
            }
        });
    }
}
