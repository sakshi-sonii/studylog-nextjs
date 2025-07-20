"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FiAward, FiBookOpen, FiClock, FiUsers, FiTrendingUp, FiStar } from 'react-icons/fi';
import { FaCrown, FaMedal, FaFire } from 'react-icons/fa';
import Link from "next/link"
import { useState, useEffect } from "react"

interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  email: string;
  totalHours: number;
  sessionCount: number;
  streak: number;
}

export default function LeaderboardPage() {
  const [individualLeaders, setIndividualLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalStats, setTotalStats] = useState({
    totalHours: 0,
    activeStudents: 0,
    longestStreak: 0,
    badgesEarned: 0
  });

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users?action=leaderboard');
      if (response.ok) {
        const data = await response.json();
        setIndividualLeaders(data);
        
        // Calculate total stats
        const totalHours = data.reduce((sum: number, entry: LeaderboardEntry) => sum + entry.totalHours, 0);
        const longestStreak = Math.max(...data.map((entry: LeaderboardEntry) => entry.streak), 0);
        
        setTotalStats({
          totalHours: Math.round(totalHours * 10) / 10,
          activeStudents: data.length,
          longestStreak,
          badgesEarned: data.length * 3 // Simplified calculation
        });
      }
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const [groupLeaders, setGroupLeaders] = useState<any[]>([]);

  const fetchGroupLeaderboard = async () => {
    try {
      const response = await fetch('/api/groups?action=leaderboard');
      if (response.ok) {
        const data = await response.json();
        setGroupLeaders(data);
      }
    } catch (error) {
      console.error('Error fetching group leaderboard:', error);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
    fetchGroupLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <FaCrown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <FaMedal className="h-6 w-6 text-gray-400" />
      case 3:
        return <FiAward className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getChangeColor = (change: string) => {
    if (change.startsWith("+")) return "text-green-600"
    if (change.startsWith("-")) return "text-red-600"
    return "text-gray-500"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FiBookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">StudyLog</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/groups" className="text-gray-600 hover:text-blue-600">
                Groups
              </Link>
              <Link href="/calendar" className="text-gray-600 hover:text-blue-600">
                Calendar
              </Link>
              <Link href="/educators" className="text-gray-600 hover:text-blue-600">
                Educators
              </Link>
              <Link href="/leaderboard" className="text-blue-600 font-medium">
                Leaderboard
              </Link>
            </nav>
          </div>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FiAward className="h-8 w-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-gray-900">Leaderboard</h2>
          </div>
          <p className="text-gray-600">Compete with fellow students and celebrate achievements</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <FiClock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{loading ? "..." : totalStats.totalHours}</div>
              <div className="text-sm text-gray-600">Total Study Hours</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <FiUsers className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{loading ? "..." : totalStats.activeStudents}</div>
              <div className="text-sm text-gray-600">Active Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <FaFire className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{loading ? "..." : totalStats.longestStreak}</div>
              <div className="text-sm text-gray-600">Longest Streak</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <FiStar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{loading ? "..." : totalStats.badgesEarned}</div>
              <div className="text-sm text-gray-600">Badges Earned</div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="individual" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="individual">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiAward className="h-5 w-5" />
                  <span>Top Individual Performers</span>
                </CardTitle>
                <CardDescription>Rankings based on study hours, consistency, and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="text-gray-500">Loading leaderboard data...</div>
                    </div>
                  ) : individualLeaders.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-gray-500">No study data available yet. Start studying to appear on the leaderboard!</div>
                    </div>
                  ) : (
                    individualLeaders.map((leader) => (
                      <div
                        key={leader.rank}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          leader.rank <= 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200" : "bg-white"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12">{getRankIcon(leader.rank)}</div>
                          <Avatar>
                            <AvatarFallback>
                              {leader.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{leader.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{leader.totalHours}h studied</span>
                              <span>{leader.streak} day streak</span>
                              <span>{leader.sessionCount} sessions</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">{Math.round(leader.totalHours * 10)}</div>
                          <div className="text-sm text-gray-500">
                            points
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="groups">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiUsers className="h-5 w-5" />
                  <span>Top Study Groups</span>
                </CardTitle>
                <CardDescription>Rankings based on collective study hours and group engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="text-gray-500">Loading group leaderboard...</div>
                    </div>
                  ) : groupLeaders.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-gray-500">No groups available yet. Create or join study groups to appear on the leaderboard!</div>
                    </div>
                  ) : (
                    groupLeaders.map((group) => (
                    <div
                      key={group.rank}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        group.rank <= 3 ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200" : "bg-white"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12">{getRankIcon(group.rank)}</div>
                        <Avatar>
                          <AvatarFallback className="bg-blue-100 text-blue-600">{group.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{group.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{group.members} members</span>
                            <span>{group.totalHours}h total</span>
                            <div className="flex items-center space-x-1">
                              <FiStar className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{group.avgRating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{group.points}</div>
                        <div className={`text-sm ${getChangeColor(group.change)}`}>
                          {group.change !== "0" && <FiTrendingUp className="h-3 w-3 inline mr-1" />}
                          {group.change}
                        </div>
                      </div>
                    </div>
                  ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Your Ranking */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Current Ranking</CardTitle>
            <CardDescription>See how you stack up against other students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                  <span className="text-lg font-bold text-blue-600">#12</span>
                </div>
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">John Doe (You)</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>89h studied</span>
                    <span>12 day streak</span>
                    <span>5 badges</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">1,890</div>
                <div className="text-sm text-green-600">
                  <FiTrendingUp className="h-3 w-3 inline mr-1" />
                  +5
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
