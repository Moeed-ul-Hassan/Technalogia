'use client'

import { useState } from 'react'
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon, PlusIcon, FireIcon, TrophyIcon, CodeBracketIcon } from '@heroicons/react/24/outline'
import { classNames } from '@/lib/utils'

interface Event {
  id: number
  title: string
  description: string
  imageUrl: string
  type: 'meetup' | 'contest' | 'hackathon' | 'workshop'
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  location: string
  isOnline: boolean
  maxParticipants: number
  currentParticipants: number
  isRegistered: boolean
  tags: string[]
  prizes?: string[]
  organizer: string
  organizerXP: number
  createdAt: string
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Weekly Tech Meme Contest",
      description: "Show off your creative side! Create the funniest tech meme and win XP points, badges, and community recognition. Theme: 'Debugging Disasters'",
      imageUrl: "https://via.placeholder.com/400x250/F59E0B/FFFFFF?text=Meme+Contest",
      type: 'contest',
      startDate: "2024-01-15",
      endDate: "2024-01-22",
      startTime: "10:00 AM",
      endTime: "11:59 PM",
      location: "Online",
      isOnline: true,
      maxParticipants: 100,
      currentParticipants: 67,
      isRegistered: false,
      tags: ["memes", "contest", "creativity"],
      prizes: ["🏆 1st Place: 1000 XP + Legend Badge", "🥈 2nd Place: 500 XP + Elite Badge", "🥉 3rd Place: 250 XP + Rising Star Badge"],
      organizer: "MemeMaster",
      organizerXP: 45600,
      createdAt: "2 days ago"
    },
    {
      id: 2,
      title: "AI & Web Dev Hackathon",
      description: "24-hour hackathon focused on building AI-powered web applications. Work solo or in teams. Great prizes and networking opportunities!",
      imageUrl: "https://via.placeholder.com/400x250/8B5CF6/FFFFFF?text=AI+Hackathon",
      type: 'hackathon',
      startDate: "2024-01-20",
      endDate: "2024-01-21",
      startTime: "9:00 AM",
      endTime: "9:00 AM",
      location: "Online + Discord",
      isOnline: true,
      maxParticipants: 50,
      currentParticipants: 42,
      isRegistered: true,
      tags: ["ai", "hackathon", "webdev", "24h"],
      prizes: ["🏆 1st Place: $1000 + Premium Badge", "🥈 2nd Place: $500 + Elite Badge", "🥉 3rd Place: $250 + Rising Star Badge"],
      organizer: "TechEvents",
      organizerXP: 32100,
      createdAt: "1 week ago"
    },
    {
      id: 3,
      title: "React Performance Workshop",
      description: "Learn advanced React optimization techniques, code splitting, lazy loading, and performance monitoring tools. Hands-on coding session.",
      imageUrl: "https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=React+Workshop",
      type: 'workshop',
      startDate: "2024-01-18",
      endDate: "2024-01-18",
      startTime: "2:00 PM",
      endTime: "5:00 PM",
      location: "Online (Zoom)",
      isOnline: true,
      maxParticipants: 30,
      currentParticipants: 28,
      isRegistered: false,
      tags: ["react", "performance", "workshop", "frontend"],
      organizer: "ReactGuru",
      organizerXP: 28750,
      createdAt: "3 days ago"
    }
  ])

  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    type: 'meetup' as Event['type'],
    startDate: '',
    startTime: '',
    endTime: '',
    location: '',
    isOnline: true,
    maxParticipants: 50,
    tags: ''
  })

  const handleRegister = (eventId: number) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            isRegistered: !event.isRegistered,
            currentParticipants: event.isRegistered ? event.currentParticipants - 1 : event.currentParticipants + 1
          }
        : event
    ))
  }

  const handleCreateEvent = () => {
    if (newEvent.title.trim() && newEvent.description.trim()) {
      const event: Event = {
        id: Date.now(),
        title: newEvent.title,
        description: newEvent.description,
        imageUrl: "https://via.placeholder.com/400x250/10B981/FFFFFF?text=New+Event",
        type: newEvent.type,
        startDate: newEvent.startDate,
        endDate: newEvent.startDate,
        startTime: newEvent.startTime,
        endTime: newEvent.endTime,
        location: newEvent.location,
        isOnline: newEvent.isOnline,
        maxParticipants: newEvent.maxParticipants,
        currentParticipants: 0,
        isRegistered: false,
        tags: newEvent.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        organizer: "DevUser123",
        organizerXP: 15420,
        createdAt: "Just now"
      }
      setEvents([event, ...events])
      setNewEvent({
        title: '',
        description: '',
        type: 'meetup',
        startDate: '',
        startTime: '',
        endTime: '',
        location: '',
        isOnline: true,
        maxParticipants: 50,
        tags: ''
      })
      setShowCreateEvent(false)
    }
  }

  const getEventTypeIcon = (type: Event['type']) => {
    switch (type) {
      case 'meetup': return <UsersIcon className="h-5 w-5" />
      case 'contest': return <TrophyIcon className="h-5 w-5" />
      case 'hackathon': return <CodeBracketIcon className="h-5 w-5" />
      case 'workshop': return <CodeBracketIcon className="h-5 w-5" />
      default: return <CalendarIcon className="h-5 w-5" />
    }
  }

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'meetup': return 'bg-blue-100 text-blue-800'
      case 'contest': return 'bg-yellow-100 text-yellow-800'
      case 'hackathon': return 'bg-purple-100 text-purple-800'
      case 'workshop': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">📅 Tech Events</h2>
          <p className="text-gray-600">Join meetups, contests, hackathons, and workshops with fellow tech enthusiasts</p>
        </div>
        <button
          onClick={() => setShowCreateEvent(!showCreateEvent)}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Create Event Form */}
      {showCreateEvent && (
        <div className="card border-2 border-primary-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create a New Event</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title
              </label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                placeholder="What's your event about?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Type
              </label>
              <select
                value={newEvent.type}
                onChange={(e) => setNewEvent({...newEvent, type: e.target.value as Event['type']})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="meetup">Meetup</option>
                <option value="contest">Contest</option>
                <option value="hackathon">Hackathon</option>
                <option value="workshop">Workshop</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={newEvent.startDate}
                onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={newEvent.startTime}
                onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <input
                type="time"
                value={newEvent.endTime}
                onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Participants
              </label>
              <input
                type="number"
                value={newEvent.maxParticipants}
                onChange={(e) => setNewEvent({...newEvent, maxParticipants: parseInt(e.target.value)})}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                placeholder="Online, Discord, Zoom, or physical location"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="Tell us about your event..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={newEvent.tags}
                onChange={(e) => setNewEvent({...newEvent, tags: e.target.value})}
                placeholder="react, workshop, frontend"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleCreateEvent}
              className="btn-primary"
            >
              Create Event
            </button>
            <button
              onClick={() => setShowCreateEvent(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Events Grid */}
      <div className="grid gap-6">
        {events.map((event) => (
          <div key={event.id} className="card hover:shadow-lg transition-shadow duration-200">
            {/* Event Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-meme-400 rounded-xl flex items-center justify-center text-white">
                  {getEventTypeIcon(event.type)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{event.organizer}</div>
                  <div className="text-sm text-gray-500">{event.createdAt}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="xp-badge">{event.organizerXP.toLocaleString()} XP</div>
                <div className={`mt-1 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                  {event.type.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Event Content */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              
              <div className="relative mb-4">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full rounded-lg shadow-sm"
                />
                {event.type === 'contest' && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                    🏆 Contest
                  </div>
                )}
                {event.type === 'hackathon' && (
                  <div className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 rounded text-xs font-medium">
                    ⚡ Hackathon
                  </div>
                )}
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{formatDate(event.startDate)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <ClockIcon className="h-4 w-4" />
                  <span>{event.startTime} - {event.endTime}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <UsersIcon className="h-4 w-4" />
                  <span>{event.currentParticipants}/{event.maxParticipants}</span>
                </div>
              </div>

              {/* Prizes for contests */}
              {event.prizes && event.prizes.length > 0 && (
                <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="text-sm font-medium text-yellow-800 mb-2">🏆 Prizes:</h4>
                  <ul className="space-y-1">
                    {event.prizes.map((prize, index) => (
                      <li key={index} className="text-sm text-yellow-700">{prize}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="tech-badge cursor-pointer hover:bg-tech-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleRegister(event.id)}
                  className={classNames(
                    "px-4 py-2 rounded-lg font-medium transition-colors",
                    event.isRegistered
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                  )}
                >
                  {event.isRegistered ? "Cancel Registration" : "Register Now"}
                </button>
                
                {event.currentParticipants >= event.maxParticipants && !event.isRegistered && (
                  <span className="text-sm text-red-600 font-medium">Event Full</span>
                )}
              </div>
              
              <div className="text-xs text-gray-400">
                {event.isOnline ? "🌐 Online" : "📍 In-Person"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
