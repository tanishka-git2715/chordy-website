import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

// Define local DB path relative to project root
// We use process.cwd() because often in Vercel/Next/Node the CWD is the root
const LOCAL_DB_FILE = join(process.cwd(), 'backend', 'waitlist.json');

// Helper to initialize local DB if missing
const initLocalDB = () => {
    // Ensure directory exists
    const dir = dirname(LOCAL_DB_FILE);
    if (!existsSync(dir)) {
        try {
            mkdirSync(dir, { recursive: true });
        } catch (err) {
            console.error('Failed to create backend directory:', err);
        }
    }

    if (!existsSync(LOCAL_DB_FILE)) {
        try {
            writeFileSync(LOCAL_DB_FILE, JSON.stringify({ waitlist: [] }, null, 2));
            console.log('Initialized local DB file:', LOCAL_DB_FILE);
        } catch (err) {
            console.error('Failed to initialize local DB:', err);
        }
    }
};

// Check if Vercel KV is available
const isKVAvailable = () => {
    return process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;
};

// Helper function to get all waitlist entries
async function getAllEntries() {
    try {
        let entries = [];
        if (isKVAvailable()) {
            // Use Vercel KV in production
            const { kv } = await import('@vercel/kv');
            const data = await kv.get('waitlist');
            // Ensure data is an array
            if (Array.isArray(data)) {
                entries = data;
                console.log('Retrieved from KV:', entries.length, 'entries');
            } else if (data) {
                console.warn('KV data is not an array, resetting to empty array. Data type:', typeof data);
                entries = [];
            } else {
                console.log('KV is empty, starting with empty array');
                entries = [];
            }
        } else {
            // Use local file for development
            initLocalDB();
            try {
                const fileData = readFileSync(LOCAL_DB_FILE, 'utf8');
                const parsed = JSON.parse(fileData);
                // Handle both array (legacy) and object (new) formats
                entries = Array.isArray(parsed) ? parsed : (parsed.waitlist || []);
                console.log('Retrieved from local file:', entries.length, 'entries');
            } catch (err) {
                console.error('Error reading local DB:', err);
                entries = [];
            }
        }
        return entries;
    } catch (error) {
        console.error('Error getting entries:', error);
        return [];
    }
}

// Helper function to save waitlist entries
async function saveEntries(entries) {
    try {
        if (!Array.isArray(entries)) {
            console.error('Attempted to save non-array entries:', entries);
            throw new Error('Entries must be an array');
        }

        if (isKVAvailable()) {
            // Use Vercel KV in production
            const { kv } = await import('@vercel/kv');
            await kv.set('waitlist', entries);
            console.log('Saved to KV:', entries.length, 'entries');
        } else {
            // Use local file for development
            initLocalDB();
            // Save as object to match backend/server.js structure
            writeFileSync(LOCAL_DB_FILE, JSON.stringify({ waitlist: entries }, null, 2));
            console.log('Saved to local file:', entries.length, 'entries');
        }
    } catch (error) {
        console.error('Error saving entries:', error);
    }
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
                data: entries,
                storage: isKVAvailable() ? 'vercel-kv' : 'local-file'
            });
        }

        // POST - Add new entry to waitlist
        if (req.method === 'POST') {
            // Robust body parsing
            let body = req.body;

            // If body is string (sometimes happens in certain envs), try to parse it
            if (typeof body === 'string') {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    console.error('Failed to parse request body string:', e);
                    return res.status(400).json({ error: 'Invalid JSON body' });
                }
            }

            // If body is missing or empty
            if (!body) {
                console.error('Request body is missing');
                return res.status(400).json({ error: 'Missing request body' });
            }

            const { name, email, category, categoryLabel, categorySpecific, linkedinId } = body;

            console.log('Received waitlist submission:', { name, email, category });

            // Validation
            if (!name || !email || !category || !categoryLabel) {
                console.log('Validation failed: missing required fields. Received:', body);
                return res.status(400).json({
                    error: 'Missing required fields: name, email, category, categoryLabel'
                });
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                console.log('Validation failed: invalid email format');
                return res.status(400).json({ error: 'Invalid email format' });
            }

            // Get current entries
            const entries = await getAllEntries();
            console.log('Current entries count:', entries.length);

            // Check for duplicate email
            const existingEntry = entries.find(entry => entry.email === email);
            if (existingEntry) {
                console.log('Duplicate email found:', email);
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

            console.log('Successfully added entry:', newEntry.id);

            return res.status(201).json({
                success: true,
                message: 'Successfully added to waitlist',
                id: newEntry.id,
                storage: isKVAvailable() ? 'vercel-kv' : 'local-file'
            });
        }

        // Method not allowed
        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Unhandled error in waitlist API:', error);
        console.error('Error stack:', error.stack);
        return res.status(500).json({
            error: 'Internal server error. Please try again.',
            message: error.message, // Include message for debugging
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
