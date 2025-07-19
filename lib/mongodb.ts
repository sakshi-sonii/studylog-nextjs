import { MongoClient } from 'mongodb'

if (!process.env.MONGO_URL) {
  throw new Error('Please define the MONGO_URL environment variable inside .env.local')
}

const uri = process.env.MONGO_URL
let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri as string)
    ;(global as any)._mongoClientPromise = client.connect()
  }
  clientPromise = (global as any)._mongoClientPromise
} else {
  client = new MongoClient(uri as string)
  clientPromise = client.connect()
}

export default clientPromise 