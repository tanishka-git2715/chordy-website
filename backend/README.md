# Node.js Backend Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Start the Server

```bash
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### POST /api/waitlist
Add a new entry to the waitlist

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "category": "founder",
  "categoryLabel": "I'm a Startup Founder",
  "categorySpecific": "My Startup Inc",
  "linkedinId": "linkedin.com/in/johndoe"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully added to waitlist",
  "id": 1
}
```

### GET /api/waitlist
Get all waitlist entries (admin only)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

### GET /api/waitlist/count
Get total number of waitlist entries

**Response:**
```json
{
  "success": true,
  "count": 10
}
```

## Database

- **Type:** SQLite
- **File:** `backend/waitlist.db`
- **Table:** `waitlist`

### Schema:
- `id` - Auto-incrementing primary key
- `name` - User's name
- `email` - User's email (unique)
- `category` - Category ID (founder/investor/professional/student/host)
- `category_label` - Full category label
- `category_specific` - Company/University/Event name
- `linkedin_id` - LinkedIn profile URL
- `created_at` - Timestamp

## Viewing Data

### Option 1: Use SQLite Browser
1. Download [DB Browser for SQLite](https://sqlitebrowser.org/)
2. Open `backend/waitlist.db`
3. View the `waitlist` table

### Option 2: Export to CSV
Use the GET endpoint and save the JSON, or use a SQLite tool to export.

## Production Deployment

### Deploy to Vercel (Serverless)
- Convert to serverless functions
- Use PostgreSQL or MongoDB instead of SQLite

### Deploy to Railway/Render/Heroku
- Push code to GitHub
- Connect repository
- Set environment variables
- Deploy!

## Security Notes

- Add authentication for admin endpoints
- Add rate limiting to prevent spam
- Use environment variables for sensitive data
- Add HTTPS in production
