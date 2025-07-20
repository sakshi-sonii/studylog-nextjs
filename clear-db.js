// Simple script to clear MongoDB data
// Run this with: node clear-db.js

const { MongoClient } = require('mongodb');

// You'll need to replace this with your actual MongoDB connection string
// It should look like: mongodb+srv://username:password@cluster.mongodb.net/database
const MONGO_URL = 'YOUR_MONGODB_CONNECTION_STRING_HERE';

async function clearDatabase() {
  if (MONGO_URL === 'YOUR_MONGODB_CONNECTION_STRING_HERE') {
    console.log('❌ Please replace the MONGO_URL with your actual MongoDB connection string');
    console.log('You can find this in your .env file or MongoDB Atlas dashboard');
    return;
  }

  const client = new MongoClient(MONGO_URL);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    
    // Clear all collections
    const collections = ['users', 'sessions', 'groups', 'educators'];
    
    for (const collectionName of collections) {
      const collection = db.collection(collectionName);
      const result = await collection.deleteMany({});
      console.log(`🗑️  Cleared ${collectionName}: ${result.deletedCount} documents deleted`);
    }

    console.log('\n🎉 Database cleared successfully!');
    console.log('Now restart your app and the groups page should be empty.');

  } catch (error) {
    console.error('❌ Error clearing database:', error);
    console.log('\n💡 Make sure:');
    console.log('1. Your MongoDB connection string is correct');
    console.log('2. Your IP is whitelisted in MongoDB Atlas');
    console.log('3. Your database user has write permissions');
  } finally {
    await client.close();
  }
}

clearDatabase(); 