"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FiSearch, FiPlus, FiUsers, FiClock, FiBookOpen, FiLock, FiGlobe, FiStar, FiMessageCircle, FiX } from 'react-icons/fi';
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from 'next/navigation';

interface Group {
  _id?: string;
  name: string;
  description: string;
  subject: string;
  isPrivate: boolean;
  tags: string[];
  rating?: number;
  members?: number;
  lastActive?: string;
  studyHours?: number;
  avatar?: string;
}

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [groups, setGroups] = useState<Group[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    subject: '',
    isPrivate: false,
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchGroups();
    if (searchParams.get('create') === '1') {
      setShowModal(true);
    }
  }, [searchParams]);

  async function fetchGroups() {
    setLoading(true);
    const res = await fetch('/api/groups');
    if (res.ok) {
      setGroups(await res.json());
    }
    setLoading(false);
  }

  async function handleCreateGroup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      }),
    });
    if (res.ok) {
      setForm({ name: '', description: '', subject: '', isPrivate: false, tags: '' });
      setShowModal(false);
      fetchGroups();
    }
    setLoading(false);
  }

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
              <FiBookOpen className="h-8 w-8 text-blue-600" />
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
          <Button onClick={() => setShowModal(true)}>
            <FiPlus className="h-4 w-4 mr-2" />
            Create Group
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
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
              <FiGlobe className="h-4 w-4 mr-2" />
              Public
            </Button>
            <Button
              variant={selectedFilter === "private" ? "default" : "outline"}
              onClick={() => setSelectedFilter("private")}
            >
              <FiLock className="h-4 w-4 mr-2" />
              Private
            </Button>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card key={group._id} className="hover:shadow-lg transition-shadow">
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
                          <FiLock className="h-3 w-3 text-gray-500" />
                        ) : (
                          <FiGlobe className="h-3 w-3 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiStar className="h-4 w-4 fill-yellow-400 text-yellow-400" />
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
                    <FiUsers className="h-4 w-4" />
                    <span>{group.members} members</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiClock className="h-4 w-4" />
                    <span>{group.studyHours}h studied</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Active {group.lastActive}</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/groups/${group._id}`}>
                        <FiMessageCircle className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/groups/${group._id}/join`}>Join</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <FiUsers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or create a new study group</p>
            <Button onClick={() => setShowModal(true)}>
              <FiPlus className="h-4 w-4 mr-2" />
              Create New Group
            </Button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <form
            onSubmit={handleCreateGroup}
            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative"
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => {
                setShowModal(false);
                if (searchParams.get('create') === '1') router.push('/groups');
              }}
            >
              <FiX className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Create Study Group</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Group Name</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={form.isPrivate}
                onChange={(e) => setForm({ ...form, isPrivate: e.target.checked })}
                className="mr-2"
                id="private-group"
              />
              <label htmlFor="private-group" className="text-sm">Private Group (requires admin approval)</label>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold mt-4 hover:from-blue-700 hover:to-indigo-700 transition-all"
              disabled={loading}
            >
              {loading ? 'Creating...' : <span className="inline-flex items-center"><FiPlus className="mr-2" />Create Group</span>}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
