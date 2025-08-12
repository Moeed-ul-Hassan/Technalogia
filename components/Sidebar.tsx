'use client'

import { useState } from 'react'
import { FireIcon, UsersIcon, TrophyIcon, StarIcon, ArrowTrendingUpIcon, PlusIcon } from '@heroicons/react/24/outline'
import { classNames } from '@/lib/utils'

interface Club {
  id: number
  name: string
  description: string
  memberCount: number
  isJoined: boolean
  icon: string
  color: string
}

interface TrendingTopic {
  id: number
  title: string
  count: number
  trend: 'up' | 'down' | 'stable'
}

export default function Sidebar() {
  const [clubs] = useState<Club[]>([
    {
      id: 1,
      name: "AI Club",
      description: "Exploring the future of artificial intelligence",
      memberCount: 1247,
      isJoined: true,
      icon: "🤖",
      color: "bg-purple-100 text-purple-800"
    },
    {
      id: 2,
      name: "Web Dev Club",
      description: "Frontend, backend, and everything in between",
      memberCount: 2156,
      isJoined: true,
      icon: "🌐",
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: 3,
      name: "Gamer Tech Club",
      description: "Game development and gaming technology",
      memberCount: 892,
      isJoined: false,
      icon: "🎮",
      color: "bg-green-100 text-green-800"
    },
    {
      id: 4,
      name: "Mobile Dev Club",
      description: "iOS, Android, and cross-platform development",
      memberCount: 1567,
      isJoined: false,
      icon: "📱",
      color: "bg-orange-100 text-orange-800"
    }
  ])

  const [trendingTopics] = useState<TrendingTopic[]>([
    { id: 1, title: "React 19", count: 234, trend: 'up' },
    { id: 2, title: "AI Code Review", count: 189, trend: 'up' },
    { id: 3, title: "TypeScript Tips", count: 156, trend: 'stable' },
    { id: 4, title: "Debugging Stories", count: 98, trend: 'down' },
    { id: 5, title: "Tech Memes", count: 445, trend: 'up' }
  ])

  const [userStats] = useState({
    xp: 15420,
    rank: "Bug Hunter 🐛",
    level: 15,
    badges: 8,
    streak: 7
  })

  const handleJoinClub = (clubId: number) => {
    // In a real app, this would make an API call
    console.log(`Joining club ${clubId}`)
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
      case 'down': return <ArrowTrendingUpIcon className="h-4 w-4 text-red-500 transform rotate-180" />
      case 'stable': return <ArrowTrendingUpIcon className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* User Stats Card */}
      <div className="card bg-gradient-to-br from-primary-50 to-meme-50 border-primary-200">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-meme-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
            {userStats.rank.charAt(0)}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">DevUser123</h3>
          <p className="text-sm text-gray-600 mb-3">{userStats.rank}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold text-primary-700">{userStats.xp.toLocaleString()}</div>
              <div className="text-gray-500">Total XP</div>
            </div>
            <div>
              <div className="font-semibold text-primary-700">Level {userStats.level}</div>
              <div className="text-gray-500">Current Level</div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-primary-200">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <TrophyIcon className="h-4 w-4 text-yellow-500" />
                <span>{userStats.badges} badges</span>
              </div>
              <div className="flex items-center space-x-1">
                <FireIcon className="h-4 w-4 text-orange-500" />
                <span>{userStats.streak} day streak</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Clubs */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">🏛️ Tech Clubs</h3>
          <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        
        <div className="space-y-3">
          {clubs.map((club) => (
            <div key={club.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-2xl">{club.icon}</div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">{club.name}</h4>
                <p className="text-xs text-gray-500 truncate">{club.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <UsersIcon className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{club.memberCount.toLocaleString()} members</span>
                </div>
              </div>
              <button
                onClick={() => handleJoinClub(club.id)}
                className={classNames(
                  "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                  club.isJoined
                    ? "bg-gray-100 text-gray-700"
                    : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                )}
              >
                {club.isJoined ? "Joined" : "Join"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <FireIcon className="h-5 w-5 text-orange-500" />
          <h3 className="text-lg font-semibold text-gray-900">🔥 Trending Topics</h3>
        </div>
        
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={topic.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-500 w-6">#{index + 1}</span>
                <span className="text-sm text-gray-900 truncate">{topic.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{topic.count}</span>
                {getTrendIcon(topic.trend)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Quick Actions</h3>
        
        <div className="space-y-3">
          <button className="w-full btn-primary text-sm">
            🎭 Create Meme
          </button>
          <button className="w-full btn-secondary text-sm">
            💬 Start Discussion
          </button>
          <button className="w-full btn-meme text-sm">
            🚀 Showcase Project
          </button>
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
            📅 Create Event
          </button>
        </div>
      </div>

      {/* Tech Slang Dictionary Preview */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Tech Slang</h3>
        
        <div className="space-y-3">
          <div className="p-3 bg-meme-50 rounded-lg border border-meme-200">
            <h4 className="font-medium text-gray-900 mb-1">Rubber Duck Debugging</h4>
            <p className="text-sm text-gray-600">Explaining your code to an inanimate object to find bugs</p>
          </div>
          
          <div className="p-3 bg-tech-50 rounded-lg border border-tech-200">
            <h4 className="font-medium text-gray-900 mb-1">Yak Shaving</h4>
            <p className="text-sm text-gray-600">Working on a seemingly pointless task that's actually necessary</p>
          </div>
          
          <button className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium">
            View More → 
          </button>
        </div>
      </div>
    </div>
  )
}
