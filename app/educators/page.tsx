"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Star, BookOpen, Clock, DollarSign, Calendar, Video, MessageCircle, Award } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function EducatorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")

  const educators = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Mathematics Professor",
      subjects: ["Calculus", "Linear Algebra", "Statistics"],
      rating: 4.9,
      reviews: 127,
      hourlyRate: 45,
      experience: "8 years",
      availability: "Available today",
      totalSessions: 340,
      description:
        "Experienced mathematics professor specializing in advanced calculus and linear algebra. Patient teaching style with proven results.",
      verified: true,
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      title: "Computer Science Expert",
      subjects: ["Algorithms", "Data Structures", "Python", "Java"],
      rating: 4.8,
      reviews: 89,
      hourlyRate: 55,
      experience: "12 years",
      availability: "Available tomorrow",
      totalSessions: 256,
      description:
        "Senior software engineer turned educator. Specializes in programming fundamentals and algorithm design.",
      verified: true,
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      title: "Physics Specialist",
      subjects: ["Mechanics", "Thermodynamics", "Quantum Physics"],
      rating: 4.7,
      reviews: 156,
      hourlyRate: 50,
      experience: "10 years",
      availability: "Available now",
      totalSessions: 423,
      description: "PhD in Physics with extensive teaching experience. Makes complex concepts easy to understand.",
      verified: true,
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      id: 4,
      name: "James Wilson",
      title: "Chemistry Tutor",
      subjects: ["Organic Chemistry", "Biochemistry", "Lab Techniques"],
      rating: 4.6,
      reviews: 73,
      hourlyRate: 40,
      experience: "5 years",
      availability: "Available this week",
      totalSessions: 189,
      description: "Graduate student with strong background in organic chemistry and laboratory work.",
      verified: false,
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      id: 5,
      name: "Dr. Lisa Thompson",
      title: "Biology Expert",
      subjects: ["Cell Biology", "Genetics", "Molecular Biology"],
      rating: 4.8,
      reviews: 94,
      hourlyRate: 48,
      experience: "7 years",
      availability: "Available today",
      totalSessions: 267,
      description: "Research scientist and educator with expertise in cellular and molecular biology.",
      verified: true,
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      id: 6,
      name: "Robert Kim",
      title: "Language Arts Teacher",
      subjects: ["English Literature", "Writing", "Grammar"],
      rating: 4.5,
      reviews: 112,
      hourlyRate: 35,
      experience: "6 years",
      availability: "Available tomorrow",
      totalSessions: 298,
      description: "Certified English teacher with passion for literature and creative writing.",
      verified: true,
      avatar: "/placeholder.svg?height=64&width=64",
    },
  ]

  const subjects = ["all", "Mathematics", "Computer Science", "Physics", "Chemistry", "Biology", "English"]

  const filteredEducators = educators.filter((educator) => {
    const matchesSearch =
      educator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      educator.subjects.some((subject) => subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      educator.title.toLowerCase().includes(searchQuery.toLowerCase())

    if (selectedSubject === "all") return matchesSearch
    return (
      matchesSearch &&
      educator.subjects.some((subject) => subject.toLowerCase().includes(selectedSubject.toLowerCase()))
    )
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
              <Link href="/groups" className="text-gray-600 hover:text-blue-600">
                Groups
              </Link>
              <Link href="/calendar" className="text-gray-600 hover:text-blue-600">
                Calendar
              </Link>
              <Link href="/educators" className="text-blue-600 font-medium">
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Expert Educators</h2>
          <p className="text-gray-600">Book one-on-one sessions with verified subject experts</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search educators by name, subject, or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {subjects.map((subject) => (
              <Button
                key={subject}
                variant={selectedSubject === subject ? "default" : "outline"}
                onClick={() => setSelectedSubject(subject)}
                className="whitespace-nowrap"
              >
                {subject === "all" ? "All Subjects" : subject}
              </Button>
            ))}
          </div>
        </div>

        {/* Educators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEducators.map((educator) => (
            <Card key={educator.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={educator.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {educator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{educator.name}</CardTitle>
                      {educator.verified && <Award className="h-4 w-4 text-blue-600" />}
                    </div>
                    <CardDescription className="mb-2">{educator.title}</CardDescription>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{educator.rating}</span>
                        <span className="text-gray-500">({educator.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-medium">${educator.hourlyRate}/hr</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{educator.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {educator.subjects.map((subject, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{educator.experience}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Video className="h-4 w-4" />
                    <span>{educator.totalSessions} sessions</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-green-600 font-medium">{educator.availability}</span>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <Link href={`/educators/${educator.id}`}>
                      <MessageCircle className="h-4 w-4 mr-1" />
                      View Profile
                    </Link>
                  </Button>
                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/educators/${educator.id}/book`}>
                      <Calendar className="h-4 w-4 mr-1" />
                      Book Session
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEducators.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No educators found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or browse all available educators</p>
            <Button asChild>
              <Link href="/educators?subject=all">Browse All Educators</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
