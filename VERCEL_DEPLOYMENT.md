# Vercel Deployment Guide - Chordy Waitlist

## ✅ Your Backend is Now Serverless!

I've converted your backend to Vercel serverless functions. Everything will deploy together on Vercel.

## 📁 What Changed

### New Files Created:
- `api/waitlist.js` - Main waitlist API endpoint
- `api/waitlist/count.js` - Get waitlist count endpoint

### Updated:
- `src/components/Index.tsx` - Now uses `/api` instead of `http://localhost:3001/api`
- Added `@vercel/kv` package for database storage

## 🚀 Deployment Steps

### 1. Set Up Vercel KV Database

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your Chordy project
3. Go to **Storage** tab
4. Click **Create Database**
5. Select **KV (Redis)**
6. Name it: `chordy-waitlist-db`
7. Click **Create**

Vercel will automatically add the environment variables to your project.

### 2. Deploy to Vercel

#### Option A: Push to GitHub (Recommended)
```bash
git add .
git commit -m "Convert backend to Vercel serverless functions"
git push
```

Vercel will automatically deploy!

#### Option B: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```

### 3. Test Your Deployment

Once deployed, test your API:
- **Add to waitlist**: `https://your-site.vercel.app/api/waitlist` (POST)
- **View all entries**: `https://your-site.vercel.app/api/waitlist` (GET)
- **Get count**: `https://your-site.vercel.app/api/waitlist/count` (GET)

## 📊 Viewing Waitlist Data

### Option 1: Vercel KV Dashboard
1. Go to Vercel Dashboard → Storage → Your KV Database
2. Click "Data Browser"
3. Look for the `waitlist` key
4. Click to view all entries

### Option 2: API Endpoint
Visit: `https://your-site.vercel.app/api/waitlist`

### Option 3: Create an Admin Page
You can create a simple admin page to view submissions (let me know if you want this!)

## 🔒 Security Notes

The current setup allows anyone to view waitlist entries via the API. For production, you should:

1. **Add authentication** to the GET endpoint
2. **Add rate limiting** to prevent spam
3. **Add reCAPTCHA** to the form

## 💡 Benefits of Vercel Serverless

✅ **No server to manage** - Vercel handles everything
✅ **Auto-scaling** - Handles any traffic automatically
✅ **Free tier** - Generous limits for waitlists
✅ **Global CDN** - Fast worldwide
✅ **One deployment** - Frontend + Backend together

## 🎯 Next Steps

1. Push your code to GitHub
2. Set up Vercel KV database
3. Vercel will auto-deploy
4. Test the waitlist form on your live site!

---

**Need help?** The API routes are in the `api/` folder and use Vercel KV for storage.
