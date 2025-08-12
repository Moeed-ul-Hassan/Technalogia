'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import MemeFeed from '@/components/MemeFeed'
import Discussions from '@/components/Discussions'
import Showcase from '@/components/Showcase'
import Events from '@/components/Events'
import Sidebar from '@/components/Sidebar'

import { classNames } from '@/lib/utils'

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0)

  const tabs = [
    { name: 'Meme Feed', icon: '🎭', component: <MemeFeed /> },
    { name: 'Discussions', icon: '💬', component: <Discussions /> },
    { name: 'Showcase', icon: '🚀', component: <Showcase /> },
    { name: 'Events', icon: '📅', component: <Events /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gradient mb-4">
                Welcome to Technalogia! 🚀
              </h1>
              <p className="text-xl text-gray-600">
                Where tech meets humor, and developers become legends. Share memes, discuss code, showcase projects, and earn XP with fellow tech enthusiasts!
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="flex space-x-1 rounded-xl bg-white p-1 shadow-sm border border-gray-200">
                {tabs.map((tab, idx) => (
                  <button
                    key={tab.name}
                    onClick={() => setSelectedTab(idx)}
                    className={classNames(
                      'w-full rounded-lg py-3 px-4 text-sm font-medium leading-5 transition-all duration-200',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2',
                      selectedTab === idx
                        ? 'bg-primary-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    )}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-lg">{tab.icon}</span>
                      {tab.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="rounded-xl bg-white p-6 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2">
              {tabs[selectedTab].component}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
