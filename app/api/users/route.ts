import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url!);
    const userId = url.searchParams.get('userId');
    const action = url.searchParams.get('action');

    const client = await clientPromise;
    const db = client.db();

    if (action === 'stats' && userId) {
      // Get user statistics
      const sessions = db.collection('sessions');
      const userSessions = await sessions.find({ userId }).toArray();
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todaySessions = userSessions.filter(session => 
        new Date(session.date) >= today
      );
      
      const totalHours = userSessions.reduce((sum, session) => sum + (session.duration || 0), 0);
      const todayHours = todaySessions.reduce((sum, session) => sum + (session.duration || 0), 0);
      
      // Calculate streak (simplified)
      const streak = calculateStreak(userSessions);
      
      return NextResponse.json({
        totalHours: Math.round(totalHours * 10) / 10,
        todayHours: Math.round(todayHours * 10) / 10,
        streak,
        totalSessions: userSessions.length
      });
    }

    if (action === 'leaderboard') {
      // Get leaderboard data
      const sessions = db.collection('sessions');
      const users = db.collection('users');
      
      // Aggregate user study hours
      const leaderboard = await sessions.aggregate([
        {
          $group: {
            _id: '$userId',
            totalHours: { $sum: '$duration' },
            sessionCount: { $sum: 1 }
          }
        },
        {
          $sort: { totalHours: -1 }
        },
        {
          $limit: 10
        }
      ]).toArray();

      // Get user details for leaderboard
      const userIds = leaderboard.map(item => item._id);
      const userDetails = await users.find({ _id: { $in: userIds } }).toArray();
      
      const userMap = new Map(userDetails.map(user => [user._id.toString(), user]));
      
      const leaderboardWithDetails = leaderboard.map((item, index) => {
        const user = userMap.get(item._id.toString());
        return {
          rank: index + 1,
          userId: item._id,
          name: user?.name || 'Anonymous',
          email: user?.email || '',
          totalHours: Math.round(item.totalHours * 10) / 10,
          sessionCount: item.sessionCount,
          streak: calculateStreak([])
        };
      });

      return NextResponse.json(leaderboardWithDetails);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error in users API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, sessionData } = await req.json();
    
    if (!userId || !sessionData) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const sessions = db.collection('sessions');
    
    const result = await sessions.insertOne({
      userId,
      ...sessionData,
      createdAt: new Date()
    });

    return NextResponse.json({ 
      message: 'Session recorded', 
      sessionId: result.insertedId 
    }, { status: 201 });
  } catch (error) {
    console.error('Error recording session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function calculateStreak(sessions: any[]): number {
  if (sessions.length === 0) return 0;
  
  const sortedSessions = sessions
    .map(s => new Date(s.date))
    .sort((a, b) => b.getTime() - a.getTime());
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let currentDate = new Date(today);
  
  for (let i = 0; i < 30; i++) { // Check last 30 days
    const hasSession = sortedSessions.some(sessionDate => {
      const sessionDay = new Date(sessionDate);
      sessionDay.setHours(0, 0, 0, 0);
      return sessionDay.getTime() === currentDate.getTime();
    });
    
    if (hasSession) {
      streak++;
    } else {
      break;
    }
    
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  return streak;
} 