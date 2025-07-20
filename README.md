# StudyLog - Collaborative Learning Platform

StudyLog is a comprehensive learning management system that helps students track their study sessions, join study groups, connect with educators, and compete on leaderboards.

## Features

### 🎯 Dashboard
- **Real-time Study Statistics**: Track daily and total study hours, current streaks, and session counts
- **Pomodoro Timer**: Built-in 25-minute focus timer with session recording
- **Progress Tracking**: Visual progress indicators and achievement badges
- **Personalized Welcome**: Dynamic greeting with user information

### 👥 Study Groups
- **Create & Join Groups**: Public and private study groups for different subjects
- **Group Management**: Search, filter, and manage group memberships
- **Collaborative Learning**: Share resources and study together
- **Group Statistics**: Track group study hours and engagement

### 📚 Educators
- **Expert Profiles**: Verified educators with detailed profiles and ratings
- **Subject Specialization**: Filter educators by subject area
- **Booking System**: Schedule one-on-one tutoring sessions
- **Review System**: Rate and review educator sessions

### 🏆 Leaderboard
- **Individual Rankings**: Compete based on study hours and consistency
- **Group Rankings**: Compare study group performance
- **Achievement Tracking**: Earn badges and recognition
- **Real-time Updates**: Live leaderboard with current statistics

### 📅 Calendar Integration
- **Session Planning**: Schedule and track study sessions
- **Progress Visualization**: Calendar view of study patterns
- **Goal Setting**: Set and track study goals

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or cloud)
- npm or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd studylog-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGO_URL=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Database Setup**
   Run the seed script to populate initial data:
   ```bash
   node scripts/seed-data.js
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Open Application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

### Collections

#### Users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  createdAt: Date
}
```

#### Sessions
```javascript
{
  _id: ObjectId,
  userId: String,
  date: String,
  title: String,
  description: String,
  duration: Number, // in hours
  time: String,
  createdAt: Date
}
```

#### Groups
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  subject: String,
  isPrivate: Boolean,
  tags: [String],
  rating: Number,
  members: Number,
  studyHours: Number,
  lastActive: String,
  avatar: String,
  createdAt: Date
}
```

#### Educators
```javascript
{
  _id: ObjectId,
  name: String,
  title: String,
  subjects: [String],
  rating: Number,
  reviews: Number,
  hourlyRate: Number,
  experience: String,
  availability: String,
  totalSessions: Number,
  description: String,
  verified: Boolean,
  createdAt: Date
}
```

## API Endpoints

### Users
- `GET /api/users?action=stats&userId=<email>` - Get user statistics
- `GET /api/users?action=leaderboard` - Get leaderboard data
- `POST /api/users` - Record study session

### Groups
- `GET /api/groups` - Get all groups
- `POST /api/groups` - Create new group

### Sessions
- `GET /api/sessions?date=<date>&userId=<email>` - Get user sessions for date
- `POST /api/sessions` - Create new session

### Educators
- `GET /api/educators` - Get all educators
- `POST /api/educators` - Create new educator

## Key Features Implementation

### Real-time Data Integration
All pages now fetch data from MongoDB instead of using hardcoded values:

- **Dashboard**: Displays actual user study statistics
- **Groups**: Shows real study groups from database
- **Leaderboard**: Ranks users based on actual study data
- **Educators**: Lists verified educators from database

### Session Recording
The Pomodoro timer automatically records completed sessions:
- Tracks study duration in hours
- Updates user statistics in real-time
- Contributes to leaderboard rankings

### Dynamic Content
- Loading states for better UX
- Error handling for failed API calls
- Empty state messages when no data exists

## Customization

### Adding New Features
1. Create API endpoints in `/app/api/`
2. Update TypeScript interfaces
3. Add UI components using shadcn/ui
4. Implement data fetching logic

### Styling
- Uses Tailwind CSS for styling
- shadcn/ui components for consistent design
- Custom gradients and animations
- Responsive design for all screen sizes

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- Ensure MongoDB connection string is accessible
- Set all required environment variables
- Configure build settings for Next.js

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

**StudyLog** - Empowering students to achieve their learning goals through collaborative study and expert guidance. 