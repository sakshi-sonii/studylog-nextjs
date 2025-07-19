import { FiUsers, FiClock, FiCalendar, FiVideo, FiBookOpen, FiAward, FiArrowRight, FiStar, FiZap, FiShield } from 'react-icons/fi'
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <FiBookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                StudyLog
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Learn Together</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/groups"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group"
            >
              Groups
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

          <div className="flex items-center space-x-3">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-8">
            <FiZap className="w-4 h-4 mr-2" />
            Join 10,000+ students already studying smarter
          </div>

          <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Study Smarter,{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Together
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your learning experience with collaborative study groups, intelligent Pomodoro timers, expert
            educator sessions, and gamified progress tracking—all in one powerful platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/signup"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center"
            >
              Get Started Free
              <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 text-lg font-semibold rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center"
            >
              <FiVideo className="mr-2 w-5 h-5" />
              Watch Demo
            </Link>
          </div>

          <div className="mt-16 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <FiShield className="w-4 h-4 mr-2 text-green-500" />
              Secure & Private
            </div>
            <div className="flex items-center">
              <FiStar className="w-4 h-4 mr-2 text-yellow-500" />
              4.9/5 Rating
            </div>
            <div className="flex items-center">
              <FiUsers className="w-4 h-4 mr-2 text-blue-500" />
              10K+ Students
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Excel</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed to enhance your learning experience and boost academic performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FiUsers,
                title: "Study Groups",
                description:
                  "Create or join study groups with real-time chat, file sharing, and collaborative learning tools",
                color: "blue",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: FiClock,
                title: "Smart Pomodoro Timer",
                description: "Focus with personal or group-synced Pomodoro sessions with intelligent break suggestions",
                color: "green",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: FiVideo,
                title: "HD Video Meetings",
                description: "Join crystal-clear video/audio meetings with screen sharing and interactive whiteboards",
                color: "purple",
                gradient: "from-purple-500 to-violet-500",
              },
              {
                icon: FiCalendar,
                title: "Smart Calendar",
                description: "AI-powered scheduling with Google Calendar sync and intelligent study session planning",
                color: "orange",
                gradient: "from-orange-500 to-red-500",
              },
              {
                icon: FiBookOpen,
                title: "Expert Educators",
                description: "Connect with verified subject experts for personalized one-on-one learning sessions",
                color: "red",
                gradient: "from-red-500 to-pink-500",
              },
              {
                icon: FiAward,
                title: "Gamification",
                description: "Earn badges, climb leaderboards, and track detailed progress with advanced analytics",
                color: "yellow",
                gradient: "from-yellow-500 to-orange-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Active Students", icon: FiUsers },
              { number: "500+", label: "Study Groups", icon: FiUsers },
              { number: "200+", label: "Expert Educators", icon: FiBookOpen },
              { number: "50K+", label: "Study Hours Logged", icon: FiClock },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 group-hover:bg-white/30 transition-colors">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Study Experience?</h3>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join thousands of students already using StudyLog to achieve their academic goals and unlock their full
            potential
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center px-10 py-4 bg-white text-gray-900 text-lg font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Start Your Journey
            <FiArrowRight className="ml-3 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                  <FiBookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">StudyLog</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Enhancing study productivity through collaborative learning, intelligent tools, and gamified
                experiences.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Features</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Study Groups</li>
                <li className="hover:text-white transition-colors cursor-pointer">Pomodoro Timer</li>
                <li className="hover:text-white transition-colors cursor-pointer">Video Meetings</li>
                <li className="hover:text-white transition-colors cursor-pointer">Educator Booking</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
                <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Connect</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Twitter</li>
                <li className="hover:text-white transition-colors cursor-pointer">Discord</li>
                <li className="hover:text-white transition-colors cursor-pointer">LinkedIn</li>
                <li className="hover:text-white transition-colors cursor-pointer">GitHub</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 StudyLog. All rights reserved. Made with ❤️ for students worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
