import { kv } from '@vercel/kv';

// Helper function to get all waitlist entries
async function getAllEntries() {
    const entries = await kv.get('waitlist') || [];
    return entries;
}

// Helper function to save waitlist entries
async function saveEntries(entries) {
    await kv.set('waitlist', entries);
}

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
        // GET - Retrieve all waitlist entries
        if (req.method === 'GET') {
            const entries = await getAllEntries();

            return res.status(200).json({
                success: true,
                count: entries.length,
                data: entries
            });
        }

        // POST - Add new entry to waitlist
        if (req.method === 'POST') {
            const { name, email, category, categoryLabel, categorySpecific, linkedinId } = req.body;

            // Validation
            if (!name || !email || !category || !categoryLabel) {
                return res.status(400).json({
                    error: 'Missing required fields: name, email, category, categoryLabel'
                });
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

            // Get current entries
            const entries = await getAllEntries();

            // Check for duplicate email
            const existingEntry = entries.find(entry => entry.email === email);
            if (existingEntry) {
                return res.status(409).json({
                    error: 'This email is already on the waitlist'
                });
            }

            // Create new entry
            const newEntry = {
                id: entries.length + 1,
                name,
                email,
                category,
                categoryLabel,
                categorySpecific: categorySpecific || null,
                linkedinId: linkedinId || null,
                createdAt: new Date().toISOString()
            };

            // Add to entries
            entries.push(newEntry);
            await saveEntries(entries);

            return res.status(201).json({
                success: true,
                message: 'Successfully added to waitlist',
                id: newEntry.id
            });
        }

        // Method not allowed
        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            error: 'Internal server error. Please try again.'
        });
    }
}
