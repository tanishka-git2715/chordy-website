# Chordy Waitlist - Node.js Backend Integration

## ✅ Setup Complete!

Your waitlist now uses a **Node.js + Express backend** with JSON file storage instead of Firebase.

## How to Run

### 1. Start the Backend Server

```bash
cd backend
npm start
```

Server runs on: **http://localhost:3001**

### 2. Start the Frontend (in a new terminal)

```bash
npm run dev
```

Frontend runs on: **http://localhost:5173**

## How It Works

1. User fills out the waitlist form
2. Frontend sends data to `http://localhost:3001/api/waitlist`
3. Backend validates and saves to `backend/waitlist.json`
4. Success message shown to user

## View Waitlist Data

### Option 1: Direct File Access
Open `backend/waitlist.json` in any text editor

### Option 2: API Endpoint
Visit: http://localhost:3001/api/waitlist

### Option 3: Get Count Only
Visit: http://localhost:3001/api/waitlist/count

## Data Structure

Each entry contains:
- `id` - Unique ID
- `name` - User's name
- `email` - User's email (unique)
- `category` - Category ID (founder/investor/professional/student/host)
- `categoryLabel` - Full category text
- `categorySpecific` - Company/University/Event name (optional)
- `linkedinId` - LinkedIn profile (optional)
- `createdAt` - ISO timestamp

## Production Deployment

### For Production, You Should:

1. **Use a Real Database**
   - PostgreSQL (recommended)
   - MongoDB
   - MySQL

2. **Deploy Backend**
   - Railway.app (easiest)
   - Render.com
   - Heroku
   - Vercel (serverless)

3. **Update Frontend API URL**
   - In `src/components/Index.tsx`, change:
   ```javascript
   const API_URL = "https://your-backend-url.com/api";
   ```

4. **Add Security**
   - Rate limiting
   - CORS restrictions
   - Environment variables
   - HTTPS only

## Advantages Over Firebase

✅ **Full Control** - Your data, your server
✅ **No Vendor Lock-in** - Easy to migrate
✅ **Free** - No Firebase costs
✅ **Simple** - Easy to understand and modify
✅ **Privacy** - Data stays on your server

## Need Help?

- Backend code: `backend/server.js`
- Frontend code: `src/components/Index.tsx`
- Database: `backend/waitlist.json`
