"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FiCalendar, FiPlus, FiX } from "react-icons/fi";

interface StudySession {
  _id?: string;
  userId: string;
  date: string;
  title: string;
  description?: string;
  time?: string;
  duration?: string;
}

const getUserId = () => {
  // Placeholder: Replace with real user ID from auth/session
  return typeof window !== 'undefined' ? (localStorage.getItem('userId') || 'demo-user') : 'demo-user';
};

export default function CalendarPage() {
  const [value, setValue] = useState<Date>(new Date());
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', time: '', duration: '' });
  const [selectedDate, setSelectedDate] = useState<string>(formatDate(new Date()));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSessions(selectedDate);
  }, [selectedDate]);

  function formatDate(date: Date) {
    return date.toISOString().split('T')[0];
  }

  async function fetchSessions(date: string) {
    setLoading(true);
    const userId = getUserId();
    const res = await fetch(`/api/sessions?date=${date}&userId=${userId}`);
    if (res.ok) {
      setSessions(await res.json());
    } else {
      setSessions([]);
    }
    setLoading(false);
  }

  function handleDayClick(date: Date) {
    setSelectedDate(formatDate(date));
    setShowModal(true);
  }

  async function handleAddSession(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const userId = getUserId();
    const res = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        date: selectedDate,
        ...form,
      }),
    });
    if (res.ok) {
      setForm({ title: '', description: '', time: '', duration: '' });
      setShowModal(false);
      fetchSessions(selectedDate);
    }
    setLoading(false);
  }

  // Mark days with sessions
  function tileContent({ date, view }: { date: Date; view: string }) {
    if (view === 'month') {
      const d = formatDate(date);
      if (sessions.some((s) => s.date === d)) {
        return <span className="block w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></span>;
      }
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="flex items-center mb-6">
          <FiCalendar className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        </div>
        <div className="mb-8 text-gray-600">
          View and manage your study sessions, group events, and educator bookings here.
        </div>
        <div className="flex flex-col items-center justify-center">
          <Calendar
            onChange={(date) => setValue(date as Date)}
            value={value}
            onClickDay={handleDayClick}
            tileContent={tileContent}
          />
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Study Sessions for {selectedDate}</h2>
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : sessions.length === 0 ? (
            <div className="text-gray-400">No sessions for this date.</div>
          ) : (
            <ul className="space-y-3">
              {sessions.map((s) => (
                <li key={s._id} className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="font-bold text-blue-700">{s.title}</div>
                  {s.time && <div className="text-sm text-gray-600">Time: {s.time}</div>}
                  {s.duration && <div className="text-sm text-gray-600">Duration: {s.duration}</div>}
                  {s.description && <div className="text-gray-700 mt-1">{s.description}</div>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <form
            onSubmit={handleAddSession}
            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative"
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowModal(false)}
            >
              <FiX className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Add Study Session for {selectedDate}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Duration (min)</label>
                <input
                  type="number"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  min={1}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold mt-4 hover:from-blue-700 hover:to-indigo-700 transition-all"
              disabled={loading}
            >
              {loading ? 'Saving...' : <span className="inline-flex items-center"><FiPlus className="mr-2" />Add Session</span>}
            </button>
          </form>
        </div>
      )}
    </div>
  );
} 