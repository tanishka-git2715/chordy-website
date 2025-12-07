import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Database file path
const DB_FILE = join(__dirname, 'waitlist.json');

// Initialize database file if it doesn't exist
if (!existsSync(DB_FILE)) {
    writeFileSync(DB_FILE, JSON.stringify({ waitlist: [] }, null, 2));
}

// Helper functions for database operations
const readDB = () => {
    const data = readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
};

const writeDB = (data) => {
    writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// POST endpoint to add to waitlist
app.post('/api/waitlist', (req, res) => {
    try {
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

        // Read current data
        const db = readDB();

        // Check for duplicate email
        const existingEntry = db.waitlist.find(entry => entry.email === email);
        if (existingEntry) {
            return res.status(409).json({
                error: 'This email is already on the waitlist'
            });
        }

        // Create new entry
        const newEntry = {
            id: db.waitlist.length + 1,
            name,
            email,
            category,
            categoryLabel,
            categorySpecific: categorySpecific || null,
            linkedinId: linkedinId || null,
            createdAt: new Date().toISOString()
        };

        // Add to database
        db.waitlist.push(newEntry);
        writeDB(db);

        res.status(201).json({
            success: true,
            message: 'Successfully added to waitlist',
            id: newEntry.id
        });

    } catch (error) {
        console.error('Error adding to waitlist:', error);
        res.status(500).json({
            error: 'Failed to add to waitlist. Please try again.'
        });
    }
});

// GET endpoint to retrieve all waitlist entries (for admin use)
app.get('/api/waitlist', (req, res) => {
    try {
        const db = readDB();

        res.json({
            success: true,
            count: db.waitlist.length,
            data: db.waitlist
        });
    } catch (error) {
        console.error('Error fetching waitlist:', error);
        res.status(500).json({ error: 'Failed to fetch waitlist entries' });
    }
});

// GET endpoint to get waitlist count
app.get('/api/waitlist/count', (req, res) => {
    try {
        const db = readDB();

        res.json({
            success: true,
            count: db.waitlist.length
        });
    } catch (error) {
        console.error('Error getting count:', error);
        res.status(500).json({ error: 'Failed to get waitlist count' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Database: ${DB_FILE}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Server shutting down...');
    process.exit(0);
});
