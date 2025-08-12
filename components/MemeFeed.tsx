'use client'

import { useState } from 'react'
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon, PlusIcon, FireIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { classNames } from '@/lib/utils'

interface Meme {
  id: number
  title: string
  imageUrl: string
  author: string
  authorXP: number
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  tags: string[]
  createdAt: string
}

export default function MemeFeed() {
  const [memes, setMemes] = useState<Meme[]>([
    {
      id: 1,
      title: "When you finally fix that bug after 6 hours of debugging",
      imageUrl: "https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Debugging+Success",
      author: "CodeMaster99",
      authorXP: 25430,
      likes: 127,
      comments: 23,
      shares: 8,
      isLiked: false,
      tags: ["debugging", "bugs", "success"],
      createdAt: "2 hours ago"
    },
    {
      id: 2,
      title: "My code vs. Production environment",
      imageUrl: "https://via.placeholder.com/400x300/10B981/FFFFFF?text=Code+vs+Production",
      author: "DevGuru",
      authorXP: 18750,
      likes: 89,
      comments: 15,
      shares: 12,
      isLiked: true,
      tags: ["production", "development", "environment"],
      createdAt: "4 hours ago"
    },
    {
      id: 3,
      title: "Stack Overflow saves the day again!",
      imageUrl: "https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Stack+Overflow+Hero",
      author: "BugHunter",
      authorXP: 32100,
      likes: 203,
      comments: 45,
      shares: 31,
      isLiked: false,
      tags: ["stackoverflow", "help", "community"],
      createdAt: "6 hours ago"
    }
  ])

  const [showCreateMeme, setShowCreateMeme] = useState(false)
  const [newMemeTitle, setNewMemeTitle] = useState('')
  const [newMemeTags, setNewMemeTags] = useState('')

  const handleLike = (memeId: number) => {
    setMemes(memes.map(meme => 
      meme.id === memeId 
        ? { ...meme, likes: meme.isLiked ? meme.likes - 1 : meme.likes + 1, isLiked: !meme.isLiked }
        : meme
    ))
  }

  const handleCreateMeme = () => {
    if (newMemeTitle.trim()) {
      const newMeme: Meme = {
        id: Date.now(),
        title: newMemeTitle,
        imageUrl: "https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=New+Meme",
        author: "DevUser123",
        authorXP: 15420,
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        tags: newMemeTags.split(',').map(tag => tag.trim()).filter(Boolean),
        createdAt: "Just now"
      }
      setMemes([newMeme, ...memes])
      setNewMemeTitle('')
      setNewMemeTags('')
      setShowCreateMeme(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">🔥 Trending Memes</h2>
          <p className="text-gray-600">Fresh tech humor from the community</p>
        </div>
        <button
          onClick={() => setShowCreateMeme(!showCreateMeme)}
          className="btn-meme flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Create Meme</span>
        </button>
      </div>

      {/* Create Meme Form */}
      {showCreateMeme && (
        <div className="card border-2 border-meme-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Your Meme</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meme Title
              </label>
              <input
                type="text"
                value={newMemeTitle}
                onChange={(e) => setNewMemeTitle(e.target.value)}
                placeholder="What's your tech story?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-meme-500 focus:border-meme-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={newMemeTags}
                onChange={(e) => setNewMemeTags(e.target.value)}
                placeholder="debugging, bugs, success"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-meme-500 focus:border-meme-500"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleCreateMeme}
                className="btn-meme"
              >
                Post Meme
              </button>
              <button
                onClick={() => setShowCreateMeme(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Memes Grid */}
      <div className="grid gap-6">
        {memes.map((meme) => (
          <div key={meme.id} className="meme-card">
            {/* Meme Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-meme-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {meme.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{meme.author}</div>
                  <div className="text-sm text-gray-500">{meme.createdAt}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="xp-badge">{meme.authorXP.toLocaleString()} XP</div>
              </div>
            </div>

            {/* Meme Content */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{meme.title}</h3>
              <div className="relative">
                <img
                  src={meme.imageUrl}
                  alt={meme.title}
                  className="w-full rounded-lg shadow-sm"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  🔥 Trending
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {meme.tags.map((tag, index) => (
                <span
                  key={index}
                  className="tech-badge cursor-pointer hover:bg-tech-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(meme.id)}
                  className={classNames(
                    "flex items-center space-x-2 text-sm font-medium transition-colors",
                    meme.isLiked
                      ? "text-red-500"
                      : "text-gray-500 hover:text-red-500"
                  )}
                >
                  {meme.isLiked ? (
                    <HeartIconSolid className="h-5 w-5" />
                  ) : (
                    <HeartIcon className="h-5 w-5" />
                  )}
                  <span>{meme.likes}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                  <ChatBubbleLeftIcon className="h-5 w-5" />
                  <span>{meme.comments}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                  <ShareIcon className="h-5 w-5" />
                  <span>{meme.shares}</span>
                </button>
              </div>
              
              <div className="text-xs text-gray-400">
                <FireIcon className="h-4 w-4 inline mr-1" />
                Hot
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
