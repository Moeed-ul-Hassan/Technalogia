'use client'

import { useState } from 'react'
import { ChevronUpIcon, ChevronDownIcon, ChatBubbleLeftIcon, ShareIcon, PlusIcon, FireIcon } from '@heroicons/react/24/outline'
import { classNames } from '@/lib/utils'

interface Discussion {
  id: number
  title: string
  content: string
  author: string
  authorXP: number
  upvotes: number
  downvotes: number
  comments: number
  shares: number
  userVote: 'up' | 'down' | null
  tags: string[]
  createdAt: string
  isHot: boolean
}

export default function Discussions() {
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: 1,
      title: "What's your favorite debugging technique?",
      content: "I've been using console.log for years, but recently discovered the power of breakpoints. What debugging methods do you swear by?",
      author: "DebugMaster",
      authorXP: 18750,
      upvotes: 45,
      downvotes: 2,
      comments: 23,
      shares: 5,
      userVote: null,
      tags: ["debugging", "development", "tips"],
      createdAt: "1 hour ago",
      isHot: true
    },
    {
      id: 2,
      title: "Best VS Code extensions for web development?",
      content: "Looking to enhance my VS Code setup. Currently using Prettier and ESLint. Any must-have extensions you'd recommend?",
      author: "WebDevPro",
      authorXP: 25430,
      upvotes: 32,
      downvotes: 1,
      comments: 18,
      shares: 3,
      userVote: 'up',
      tags: ["vscode", "webdev", "tools"],
      createdAt: "3 hours ago",
      isHot: false
    },
    {
      id: 3,
      title: "How do you stay motivated during long coding sessions?",
      content: "Sometimes I hit a wall after 4-5 hours of coding. What keeps you going? Music, breaks, snacks?",
      author: "CodeWarrior",
      authorXP: 32100,
      upvotes: 67,
      downvotes: 3,
      comments: 31,
      shares: 12,
      userVote: null,
      tags: ["motivation", "productivity", "wellness"],
      createdAt: "5 hours ago",
      isHot: true
    }
  ])

  const [showCreateDiscussion, setShowCreateDiscussion] = useState(false)
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('')
  const [newDiscussionContent, setNewDiscussionContent] = useState('')
  const [newDiscussionTags, setNewDiscussionTags] = useState('')

  const handleVote = (discussionId: number, voteType: 'up' | 'down') => {
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === discussionId) {
        const currentVote = discussion.userVote
        let upvotes = discussion.upvotes
        let downvotes = discussion.downvotes

        if (currentVote === voteType) {
          // Remove vote
          if (voteType === 'up') upvotes--
          else downvotes--
          return { ...discussion, upvotes, downvotes, userVote: null }
        } else if (currentVote === null) {
          // Add new vote
          if (voteType === 'up') upvotes++
          else downvotes++
          return { ...discussion, upvotes, downvotes, userVote: voteType }
        } else {
          // Change vote
          if (voteType === 'up') {
            upvotes++
            downvotes--
          } else {
            downvotes++
            upvotes--
          }
          return { ...discussion, upvotes, downvotes, userVote: voteType }
        }
      }
      return discussion
    }))
  }

  const handleCreateDiscussion = () => {
    if (newDiscussionTitle.trim() && newDiscussionContent.trim()) {
      const newDiscussion: Discussion = {
        id: Date.now(),
        title: newDiscussionTitle,
        content: newDiscussionContent,
        author: "DevUser123",
        authorXP: 15420,
        upvotes: 0,
        downvotes: 0,
        comments: 0,
        shares: 0,
        userVote: null,
        tags: newDiscussionTags.split(',').map(tag => tag.trim()).filter(Boolean),
        createdAt: "Just now",
        isHot: false
      }
      setDiscussions([newDiscussion, ...discussions])
      setNewDiscussionTitle('')
      setNewDiscussionContent('')
      setNewDiscussionTags('')
      setShowCreateDiscussion(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">💬 Tech Discussions</h2>
          <p className="text-gray-600">Share knowledge, ask questions, and learn from the community</p>
        </div>
        <button
          onClick={() => setShowCreateDiscussion(!showCreateDiscussion)}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Start Discussion</span>
        </button>
      </div>

      {/* Create Discussion Form */}
      {showCreateDiscussion && (
        <div className="card border-2 border-primary-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Start a New Discussion</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={newDiscussionTitle}
                onChange={(e) => setNewDiscussionTitle(e.target.value)}
                placeholder="What would you like to discuss?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={newDiscussionContent}
                onChange={(e) => setNewDiscussionContent(e.target.value)}
                placeholder="Share your thoughts, questions, or experiences..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={newDiscussionTags}
                onChange={(e) => setNewDiscussionTags(e.target.value)}
                placeholder="webdev, javascript, tips"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleCreateDiscussion}
                className="btn-primary"
              >
                Post Discussion
              </button>
              <button
                onClick={() => setShowCreateDiscussion(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discussions List */}
      <div className="space-y-4">
        {discussions.map((discussion) => (
          <div key={discussion.id} className="card hover:shadow-md transition-shadow duration-200">
            {/* Discussion Header */}
            <div className="flex items-start space-x-4">
              {/* Voting */}
              <div className="flex flex-col items-center space-y-1">
                <button
                  onClick={() => handleVote(discussion.id, 'up')}
                  className={classNames(
                    "p-1 rounded hover:bg-gray-100 transition-colors",
                    discussion.userVote === 'up' ? "text-primary-600" : "text-gray-400"
                  )}
                >
                  <ChevronUpIcon className="h-6 w-6" />
                </button>
                <span className="text-sm font-semibold text-gray-900">
                  {discussion.upvotes - discussion.downvotes}
                </span>
                <button
                  onClick={() => handleVote(discussion.id, 'down')}
                  className={classNames(
                    "p-1 rounded hover:bg-gray-100 transition-colors",
                    discussion.userVote === 'down' ? "text-red-600" : "text-gray-400"
                  )}
                >
                  <ChevronDownIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{discussion.title}</h3>
                  {discussion.isHot && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <FireIcon className="h-3 w-3 mr-1" />
                      Hot
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-3">{discussion.content}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {discussion.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="tech-badge cursor-pointer hover:bg-tech-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>Posted by {discussion.author}</span>
                    <span>•</span>
                    <span>{discussion.createdAt}</span>
                    <span>•</span>
                    <span className="xp-badge">{discussion.authorXP.toLocaleString()} XP</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
                      <ChatBubbleLeftIcon className="h-4 w-4" />
                      <span>{discussion.comments} comments</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
                      <ShareIcon className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
