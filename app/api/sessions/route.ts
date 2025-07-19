import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { userId, date, title, description, time, duration } = await req.json();
    if (!userId || !date || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const sessions = db.collection('sessions');
    const result = await sessions.insertOne({ userId, date, title, description, time, duration, createdAt: new Date() });
    return NextResponse.json({ message: 'Session added', sessionId: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url!);
    const date = url.searchParams.get('date');
    const userId = url.searchParams.get('userId');
    if (!date || !userId) {
      return NextResponse.json({ error: 'Missing date or userId' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const sessions = db.collection('sessions');
    const result = await sessions.find({ userId, date }).toArray();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 