'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, BellIcon, UserCircleIcon, FireIcon } from '@heroicons/react/24/outline'
import { classNames } from '@/lib/utils'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications] = useState(3)
  const [userXP] = useState(15420)
  const [userRank] = useState("Bug Hunter 🐛")

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gradient">
                Technalogia
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search memes, discussions, or members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* XP Display */}
            <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-primary-50 to-meme-50 px-4 py-2 rounded-lg border border-primary-200">
              <FireIcon className="h-5 w-5 text-primary-600" />
              <div className="text-sm">
                <div className="font-semibold text-primary-800">{userXP.toLocaleString()} XP</div>
                <div className="text-xs text-primary-600">{userRank}</div>
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg">
              <BellIcon className="h-6 w-6" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-2">
                <UserCircleIcon className="h-8 w-8" />
                <span className="hidden md:block text-sm font-medium">DevUser123</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
