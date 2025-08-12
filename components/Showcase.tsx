'use client'

import { useState } from 'react'
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon, PlusIcon, ExternalLinkIcon, CodeBracketIcon, GlobeAltIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { classNames } from '@/lib/utils'

interface Project {
  id: number
  title: string
  description: string
  imageUrl: string
  author: string
  authorXP: number
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  tags: string[]
  techStack: string[]
  projectUrl?: string
  githubUrl?: string
  createdAt: string
  category: 'web' | 'mobile' | 'ai' | 'game' | 'other'
}

export default function Showcase() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "AI-Powered Code Review Assistant",
      description: "A Chrome extension that uses GPT to analyze code changes and suggest improvements in real-time. Perfect for code reviews and learning best practices.",
      imageUrl: "https://via.placeholder.com/400x250/8B5CF6/FFFFFF?text=AI+Code+Review",
      author: "AIDevPro",
      authorXP: 45600,
      likes: 89,
      comments: 23,
      shares: 15,
      isLiked: false,
      tags: ["ai", "chrome-extension", "code-review"],
      techStack: ["JavaScript", "OpenAI API", "Chrome Extensions", "React"],
      projectUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      createdAt: "1 day ago",
      category: 'ai'
    },
    {
      id: 2,
      title: "Tech Meme Generator",
      description: "A web app that lets developers create custom tech memes using popular templates. Built with modern web technologies and a meme database.",
      imageUrl: "https://via.placeholder.com/400x250/F59E0B/FFFFFF?text=Meme+Generator",
      author: "MemeLord",
      authorXP: 28750,
      likes: 156,
      comments: 34,
      shares: 42,
      isLiked: true,
      tags: ["memes", "web-app", "generator"],
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas API"],
      projectUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      createdAt: "2 days ago",
      category: 'web'
    },
    {
      id: 3,
      title: "Flutter Weather App",
      description: "A beautiful weather app built with Flutter that shows real-time weather data with animated backgrounds and smooth transitions.",
      imageUrl: "https://via.placeholder.com/400x250/10B981/FFFFFF?text=Weather+App",
      author: "MobileDev",
      authorXP: 32100,
      likes: 67,
      comments: 18,
      shares: 9,
      isLiked: false,
      tags: ["mobile", "weather", "flutter"],
      techStack: ["Flutter", "Dart", "Weather API", "Animations"],
      projectUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      createdAt: "3 days ago",
      category: 'mobile'
    }
  ])

  const [showCreateProject, setShowCreateProject] = useState(false)
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tags: '',
    techStack: '',
    projectUrl: '',
    githubUrl: '',
    category: 'web' as Project['category']
  })

  const handleLike = (projectId: number) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, likes: project.isLiked ? project.likes - 1 : project.likes + 1, isLiked: !project.isLiked }
        : project
    ))
  }

  const handleCreateProject = () => {
    if (newProject.title.trim() && newProject.description.trim()) {
      const project: Project = {
        id: Date.now(),
        title: newProject.title,
        description: newProject.description,
        imageUrl: "https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=New+Project",
        author: "DevUser123",
        authorXP: 15420,
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        tags: newProject.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        techStack: newProject.techStack.split(',').map(tech => tech.trim()).filter(Boolean),
        projectUrl: newProject.projectUrl || undefined,
        githubUrl: newProject.githubUrl || undefined,
        createdAt: "Just now",
        category: newProject.category
      }
      setProjects([project, ...projects])
      setNewProject({
        title: '',
        description: '',
        tags: '',
        techStack: '',
        projectUrl: '',
        githubUrl: '',
        category: 'web'
      })
      setShowCreateProject(false)
    }
  }

  const getCategoryIcon = (category: Project['category']) => {
    switch (category) {
      case 'web': return <GlobeAltIcon className="h-5 w-5" />
      case 'mobile': return <DevicePhoneMobileIcon className="h-5 w-5" />
      case 'ai': return <CodeBracketIcon className="h-5 w-5" />
      case 'game': return <CodeBracketIcon className="h-5 w-5" />
      default: return <CodeBracketIcon className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: Project['category']) => {
    switch (category) {
      case 'web': return 'bg-blue-100 text-blue-800'
      case 'mobile': return 'bg-green-100 text-green-800'
      case 'ai': return 'bg-purple-100 text-purple-800'
      case 'game': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">🚀 Project Showcase</h2>
          <p className="text-gray-600">Share your side projects, portfolios, and experiments with the community</p>
        </div>
        <button
          onClick={() => setShowCreateProject(!showCreateProject)}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Showcase Project</span>
        </button>
      </div>

      {/* Create Project Form */}
      {showCreateProject && (
        <div className="card border-2 border-primary-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Showcase Your Project</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                placeholder="What did you build?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={newProject.category}
                onChange={(e) => setNewProject({...newProject, category: e.target.value as Project['category']})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="web">Web App</option>
                <option value="mobile">Mobile App</option>
                <option value="ai">AI/ML</option>
                <option value="game">Game</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                placeholder="Tell us about your project..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={newProject.tags}
                onChange={(e) => setNewProject({...newProject, tags: e.target.value})}
                placeholder="ai, chrome-extension, code-review"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tech Stack (comma separated)
              </label>
              <input
                type="text"
                value={newProject.techStack}
                onChange={(e) => setNewProject({...newProject, techStack: e.target.value})}
                placeholder="React, TypeScript, OpenAI API"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Live Demo URL (optional)
              </label>
              <input
                type="url"
                value={newProject.projectUrl}
                onChange={(e) => setNewProject({...newProject, projectUrl: e.target.value})}
                placeholder="https://your-project.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub URL (optional)
              </label>
              <input
                type="url"
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({...newProject, githubUrl: e.target.value})}
                placeholder="https://github.com/username/repo"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleCreateProject}
              className="btn-primary"
            >
              Showcase Project
            </button>
            <button
              onClick={() => setShowCreateProject(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.id} className="card hover:shadow-lg transition-shadow duration-200">
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-meme-400 rounded-xl flex items-center justify-center text-white">
                  {getCategoryIcon(project.category)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{project.author}</div>
                  <div className="text-sm text-gray-500">{project.createdAt}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="xp-badge">{project.authorXP.toLocaleString()} XP</div>
                <div className={`mt-1 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}>
                  {project.category.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="relative mb-4">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full rounded-lg shadow-sm"
                />
              </div>

              {/* Tech Stack */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Tech Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
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
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(project.id)}
                  className={classNames(
                    "flex items-center space-x-2 text-sm font-medium transition-colors",
                    project.isLiked
                      ? "text-red-500"
                      : "text-gray-500 hover:text-red-500"
                  )}
                >
                  {project.isLiked ? (
                    <HeartIconSolid className="h-5 w-5" />
                  ) : (
                    <HeartIcon className="h-5 w-5" />
                  )}
                  <span>{project.likes}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                  <ChatBubbleLeftIcon className="h-5 w-5" />
                  <span>{project.comments} comments</span>
                </button>
                
                <button className="flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                  <ShareIcon className="h-5 w-5" />
                  <span>{project.shares} shares</span>
                </button>
              </div>
              
              <div className="flex space-x-2">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-primary-100 text-primary-800 hover:bg-primary-200 transition-colors"
                  >
                    <ExternalLinkIcon className="h-4 w-4 mr-1" />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                  >
                    <CodeBracketIcon className="h-4 w-4 mr-1" />
                    Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
