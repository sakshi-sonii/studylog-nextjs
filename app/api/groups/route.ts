import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { name, description, subject, isPrivate, tags } = await req.json();
    if (!name || !description || !subject) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const groups = db.collection('groups');
    const result = await groups.insertOne({ name, description, subject, isPrivate, tags, createdAt: new Date() });
    return NextResponse.json({ message: 'Group created', groupId: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const groups = db.collection('groups');
    const result = await groups.find({}).toArray();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 