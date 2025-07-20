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

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url!);
    const action = url.searchParams.get('action');
    
    const client = await clientPromise;
    const db = client.db();
    const groups = db.collection('groups');

    if (action === 'leaderboard') {
      // Get group leaderboard data
      const result = await groups.find({})
        .sort({ studyHours: -1, rating: -1 })
        .limit(10)
        .toArray();
      
      const leaderboardData = result.map((group, index) => ({
        rank: index + 1,
        name: group.name,
        avatar: group.avatar || group.name.charAt(0),
        members: group.members || 0,
        totalHours: group.studyHours || 0,
        avgRating: group.rating || 0,
        points: Math.round((group.studyHours || 0) * (group.rating || 0) * 10),
        change: "0" // This would need to be calculated based on historical data
      }));

      return NextResponse.json(leaderboardData, { status: 200 });
    }

    // Default: get all groups
    const result = await groups.find({}).toArray();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 