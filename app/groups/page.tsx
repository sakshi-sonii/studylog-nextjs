"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Users, Clock, BookOpen, Lock, Globe, Star, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const groups = [
    {
      id: 1,
      name: "Advanced Mathematics Study Group",
      description: "Preparing for calculus and linear algebra exams together",
      subject: "Mathematics",
      members: 24,
      isPrivate: false,
      rating: 4.8,
      tags: ["Calculus", "Linear Algebra", "Exam Prep"],
      lastActive: "2 hours ago",
      studyHours: 156,
      avatar: "M",
    },
    {
      id: 2,
      name: "Physics Problem Solvers",
      description: "Weekly physics problem-solving sessions and discussions",
      subject: "Physics",
      members: 18,
      isPrivate: true,
      rating: 4.6,
      tags: ["Problem Solving", "Mechanics", "Thermodynamics"],
      lastActive: "1 hour ago",
      studyHours: 89,
      avatar: "P",
    },
    {
      id: 3,
      name: "Computer Science Fundamentals",
      description: "Learning algorithms, data structures, and programming concepts",
      subject: "Computer Science",
      members: 32,
      isPrivate: false,
      rating: 4.9,
      tags: ["Algorithms", "Data Structures", "Programming"],
      lastActive: "30 minutes ago",
      studyHours: 203,
      avatar: "CS",
    },
    {
      id: 4,
      name: "Biology Study Circle",
      description: "Collaborative learning for biology students",
      subject: "Biology",
      members: 15,
      isPrivate: false,
      rating: 4.5,
      tags: ["Cell Biology", "Genetics", "Ecology"],
      lastActive: "4 hours ago",
      studyHours: 67,
      avatar: "B",
    },
    {
      id: 5,
      name: "Chemistry Lab Partners",
      description: "Virtual lab discussions and chemistry problem solving",
      subject: "Chemistry",
      members: 12,
      isPrivate: true,
      rating: 4.7,
      tags: ["Organic Chemistry", "Lab Work", "Reactions"],
      lastActive: "1 day ago",
      studyHours: 45,
      avatar: "C",
    },
    {
      id: 6,
      name: "History Discussion Forum",
      description: "Exploring historical events and their significance",
      subject: "History",
      members: 21,
      isPrivate: false,
      rating: 4.4,
      tags: ["World History", "Analysis", "Research"],
      lastActive: "3 hours ago",
      studyHours: 78,
      avatar: "H",
    },
  ]

  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    if (selectedFilter === "all") return matchesSearch
    if (selectedFilter === "public") return matchesSearch && !group.isPrivate
    if (selectedFilter === "private") return matchesSearch && group.isPrivate
    return matchesSearch
  })

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
              <Link href="/groups" className="text-blue-600 font-medium">
                Groups
              </Link>
              <Link href="/calendar" className="text-gray-600 hover:text-blue-600">
                Calendar
              </Link>
              <Link href="/educators" className="text-gray-600 hover:text-blue-600">
                Educators
              </Link>
              <Link href="/leaderboard" className="text-gray-600 hover:text-blue-600">
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Study Groups</h2>
            <p className="text-gray-600">Join collaborative learning communities</p>
          </div>
          <Button asChild>
            <Link href="/groups/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search groups by name, subject, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant={selectedFilter === "all" ? "default" : "outline"} onClick={() => setSelectedFilter("all")}>
              All Groups
            </Button>
            <Button
              variant={selectedFilter === "public" ? "default" : "outline"}
              onClick={() => setSelectedFilter("public")}
            >
              <Globe className="h-4 w-4 mr-2" />
              Public
            </Button>
            <Button
              variant={selectedFilter === "private" ? "default" : "outline"}
              onClick={() => setSelectedFilter("private")}
            >
              <Lock className="h-4 w-4 mr-2" />
              Private
            </Button>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-600">{group.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary">{group.subject}</Badge>
                        {group.isPrivate ? (
                          <Lock className="h-3 w-3 text-gray-500" />
                        ) : (
                          <Globe className="h-3 w-3 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{group.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{group.description}</CardDescription>

                <div className="flex flex-wrap gap-1 mb-4">
                  {group.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{group.members} members</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{group.studyHours}h studied</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Active {group.lastActive}</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/groups/${group.id}`}>
                        <MessageCircle className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/groups/${group.id}/join`}>Join</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or create a new study group</p>
            <Button asChild>
              <Link href="/groups/create">
                <Plus className="h-4 w-4 mr-2" />
                Create New Group
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
