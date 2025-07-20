# Manual Database Clear Guide

Since you're using a cloud MongoDB instance, here's how to clear the data manually:

## Option 1: MongoDB Atlas Dashboard

1. **Log into MongoDB Atlas**
2. **Navigate to your cluster**
3. **Click on "Browse Collections"**
4. **Select your database**
5. **For each collection (users, sessions, groups, educators):**
   - Click on the collection
   - Click the "Delete" button (trash icon)
   - Select "Delete All Documents"
   - Confirm the deletion

## Option 2: Using MongoDB Compass

1. **Open MongoDB Compass**
2. **Connect to your database using your connection string**
3. **Navigate to each collection**
4. **Delete all documents manually**

## Option 3: Using the Script (if you have the correct MONGO_URL)

1. **Make sure your `.env.local` file has the correct MONGO_URL**
2. **Run the clear script:**
   ```bash
   node scripts/clear-database.js
   ```

## After Clearing the Data

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Visit the groups page** - it should now show "No groups found"

3. **Create new groups** through the UI - only these will appear

4. **The application will now only show user-created data**

## Why This Happened

The `seed-data.js` script was automatically inserting sample data into your MongoDB database, which is why you were seeing groups that you didn't create manually. This script has now been removed to ensure only user-created data is displayed. 