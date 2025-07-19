"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, BookOpen, Clock, Users, TrendingUp, Crown, Star, Flame } from "lucide-react"
import Link from "next/link"

export default function LeaderboardPage() {
  const individualLeaders = [
    {
      rank: 1,
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      studyHours: 156,
      streak: 28,
      badges: 12,
      points: 2840,
      change: "+2",
    },
    {
      rank: 2,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      studyHours: 142,
      streak: 21,
      badges: 10,
      points: 2650,
      change: "0",
    },
    {
      rank: 3,
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      studyHours: 138,
      streak: 19,
      badges: 9,
      points: 2580,
      change: "+1",
    },
    {
      rank: 4,
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      studyHours: 134,
      streak: 15,
      badges: 8,
      points: 2420,
      change: "-1",
    },
    {
      rank: 5,
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      studyHours: 129,
      streak: 12,
      badges: 7,
      points: 2350,
      change: "+3",
    },
  ]

  const groupLeaders = [
    {
      rank: 1,
      name: "Advanced Mathematics Study Group",
      avatar: "M",
      members: 24,
      totalHours: 1240,
      avgRating: 4.8,
      points: 8960,
      change: "+1",
    },
    {
      rank: 2,
      name: "Computer Science Fundamentals",
      avatar: "CS",
      members: 32,
      totalHours: 1180,
      avgRating: 4.9,
      points: 8720,
      change: "-1",
    },
    {
      rank: 3,
      name: "Physics Problem Solvers",
      avatar: "P",
      members: 18,
      totalHours: 890,
      avgRating: 4.6,
      points: 6840,
      change: "0",
    },
    {
      rank: 4,
      name: "Biology Study Circle",
      avatar: "B",
      members: 15,
      totalHours: 670,
      avgRating: 4.5,
      points: 5420,
      change: "+2",
    },
    {
      rank: 5,
      name: "Chemistry Lab Partners",
      avatar: "C",
      members: 12,
      totalHours: 450,
      avgRating: 4.7,
      points: 4680,
      change: "-1",
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
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
              <BookOpen className="h-8 w-8 text-blue-600" />
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
            <Trophy className="h-8 w-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-gray-900">Leaderboard</h2>
          </div>
          <p className="text-gray-600">Compete with fellow students and celebrate achievements</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">2,450</div>
              <div className="text-sm text-gray-600">Total Study Hours</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-gray-600">Active Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Flame className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">28</div>
              <div className="text-sm text-gray-600">Longest Streak</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">89</div>
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
                  <Trophy className="h-5 w-5" />
                  <span>Top Individual Performers</span>
                </CardTitle>
                <CardDescription>Rankings based on study hours, consistency, and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {individualLeaders.map((leader) => (
                    <div
                      key={leader.rank}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        leader.rank <= 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200" : "bg-white"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12">{getRankIcon(leader.rank)}</div>
                        <Avatar>
                          <AvatarImage src={leader.avatar || "/placeholder.svg"} />
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
                            <span>{leader.studyHours}h studied</span>
                            <span>{leader.streak} day streak</span>
                            <span>{leader.badges} badges</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{leader.points}</div>
                        <div className={`text-sm ${getChangeColor(leader.change)}`}>
                          {leader.change !== "0" && <TrendingUp className="h-3 w-3 inline mr-1" />}
                          {leader.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="groups">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Top Study Groups</span>
                </CardTitle>
                <CardDescription>Rankings based on collective study hours and group engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {groupLeaders.map((group) => (
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
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{group.avgRating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{group.points}</div>
                        <div className={`text-sm ${getChangeColor(group.change)}`}>
                          {group.change !== "0" && <TrendingUp className="h-3 w-3 inline mr-1" />}
                          {group.change}
                        </div>
                      </div>
                    </div>
                  ))}
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
                  <TrendingUp className="h-3 w-3 inline mr-1" />
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
