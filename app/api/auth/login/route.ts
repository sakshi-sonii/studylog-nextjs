import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { compare } from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()
    const users = db.collection('users')

    const user = await users.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // For now, just return success (no session/JWT yet)
    return NextResponse.json({ message: 'Login successful', userId: user._id }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 