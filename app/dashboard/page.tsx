"use client"

import { FiUsers, FiClock, FiCalendar, FiBookOpen, FiAward, FiPlay, FiPause, FiPlus, FiBell, FiSearch, FiTrendingUp, FiZap, FiTarget } from 'react-icons/fi'
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function DashboardPage() {
  const [timerActive, setTimerActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerActive, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toggleTimer = () => {
    setTimerActive(!timerActive)
  }

  const resetTimer = () => {
    setTimerActive(false)
    setTimeLeft(25 * 60)
  }

  const progress = (1 - timeLeft / (25 * 60)) * 100

  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <FiBookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  StudyLog
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Dashboard</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-blue-600 font-semibold relative">
                Dashboard
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600"></span>
              </Link>
              <Link
                href="/groups"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group"
              >
                Groups
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/calendar"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group"
              >
                Calendar
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/educators"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group"
              >
                Educators
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/leaderboard"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group"
              >
                Leaderboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
              <FiSearch className="h-5 w-5" />
            </button>
            <button className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative">
              <FiBell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
              JD
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl"></div>
              <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}! 👋
                    </h2>
                    {session?.user?.email && (
                      <p className="text-gray-600 text-lg mb-1">{session.user.email}</p>
                    )}
                    <p className="text-gray-600 text-lg">Ready to continue your learning journey?</p>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <FiZap className="h-10 w-10 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Study Hours Today",
                  value: "4.5h",
                  icon: FiClock,
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "from-blue-50 to-cyan-50",
                  change: "+2.1h from yesterday",
                },
                {
                  title: "Active Groups",
                  value: "3",
                  icon: FiUsers,
                  color: "from-green-500 to-emerald-500",
                  bgColor: "from-green-50 to-emerald-50",
                  change: "2 new messages",
                },
                {
                  title: "Current Streak",
                  value: "12 days",
                  icon: FiAward,
                  color: "from-orange-500 to-red-500",
                  bgColor: "from-orange-50 to-red-50",
                  change: "Personal best!",
                },
              ].map((stat, index) => (
                <div key={index} className="group relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity`}
                  ></div>
                  <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <FiTrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.change}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pomodoro Timer */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <FiClock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Pomodoro Timer</h3>
                      <p className="text-gray-600">Stay focused with timed study sessions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiTarget className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500">Focus Mode</span>
                  </div>
                </div>

                <div className="text-center space-y-6">
                  <div className="relative inline-block">
                    <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                        className="text-blue-600 transition-all duration-1000"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-mono font-bold text-gray-900">{formatTime(timeLeft)}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {timerActive ? "Focus Time" : "Ready to Start"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={toggleTimer}
                      className={`flex items-center px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                        timerActive
                          ? "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600"
                          : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                      }`}
                    >
                      {timerActive ? <FiPause className="h-5 w-5 mr-2" /> : <FiPlay className="h-5 w-5 mr-2" />}
                      {timerActive ? "Pause" : "Start"}
                    </button>
                    <button
                      onClick={resetTimer}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition-all duration-200"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Groups */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Your Study Groups</h3>
                  <p className="text-gray-600">Active groups you're part of</p>
                </div>
                <button
                  onClick={() => router.push('/groups?create=1')}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <FiPlus className="h-4 w-4 mr-2" />
                  Create Group
                </button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: "Advanced Mathematics",
                    members: 12,
                    subject: "Math",
                    active: true,
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    name: "Physics Study Circle",
                    members: 8,
                    subject: "Physics",
                    active: false,
                    color: "from-purple-500 to-violet-500",
                  },
                  {
                    name: "Computer Science Prep",
                    members: 15,
                    subject: "CS",
                    active: true,
                    color: "from-green-500 to-emerald-500",
                  },
                ].map((group, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${group.color} rounded-xl flex items-center justify-center text-white font-bold shadow-lg`}
                      >
                        {group.subject}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{group.name}</h4>
                        <p className="text-sm text-gray-600">{group.members} members</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          group.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {group.active ? "Active" : "Inactive"}
                      </span>
                      <Link
                        href={`/groups/${index + 1}`}
                        className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg font-medium transition-all"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FiCalendar className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Upcoming Events</h3>
              </div>

              <div className="space-y-3">
                {[
                  { title: "Math Group Study", time: "2:00 PM", type: "group", color: "bg-blue-500" },
                  { title: "Physics Tutor Session", time: "4:30 PM", type: "tutor", color: "bg-purple-500" },
                  { title: "CS Project Meeting", time: "6:00 PM", type: "meeting", color: "bg-green-500" },
                ].map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all cursor-pointer"
                  >
                    <div className={`w-3 h-3 ${event.color} rounded-full`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-600">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/calendar"
                className="block w-full mt-4 px-4 py-2 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
              >
                View All Events
              </Link>
            </div>

            {/* Progress Tracking */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FiTrendingUp className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Weekly Progress</h3>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Study Goal", current: 28, total: 40, color: "from-blue-500 to-cyan-500" },
                  { label: "Group Sessions", current: 5, total: 8, color: "from-green-500 to-emerald-500" },
                  { label: "Assignments", current: 3, total: 4, color: "from-orange-500 to-red-500" },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700 font-medium">{item.label}</span>
                      <span className="text-gray-600">
                        {item.current}/{item.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${item.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${(item.current / item.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FiAward className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Recent Achievements</h3>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: "Study Streak",
                    description: "10 days in a row",
                    icon: "🔥",
                    bg: "from-red-50 to-orange-50",
                    border: "border-red-200",
                  },
                  {
                    title: "Group Leader",
                    description: "Led 5 study sessions",
                    icon: "👑",
                    bg: "from-yellow-50 to-amber-50",
                    border: "border-yellow-200",
                  },
                  {
                    title: "Early Bird",
                    description: "Started before 8 AM",
                    icon: "🌅",
                    bg: "from-blue-50 to-cyan-50",
                    border: "border-blue-200",
                  },
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 bg-gradient-to-r ${achievement.bg} rounded-xl border ${achievement.border}`}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{achievement.title}</p>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
