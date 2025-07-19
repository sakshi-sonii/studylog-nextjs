import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { hash } from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()
    const users = db.collection('users')

    const existing = await users.findOne({ email })
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    const hashedPassword = await hash(password, 10)

    const result = await users.insertOne({ name, email, password: hashedPassword, createdAt: new Date() })

    return NextResponse.json({ message: 'User created', userId: result.insertedId }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 