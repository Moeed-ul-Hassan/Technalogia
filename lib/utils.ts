import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function classNames(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatXP(xp: number): string {
  if (xp >= 1000000) {
    return `${(xp / 1000000).toFixed(1)}M XP`
  }
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K XP`
  }
  return `${xp} XP`
}

export function getRank(xp: number): string {
  if (xp >= 100000) return "Tech Legend 🏆"
  if (xp >= 50000) return "Code Master 🎯"
  if (xp >= 25000) return "Bug Hunter 🐛"
  if (xp >= 10000) return "Syntax Samurai ⚔️"
  if (xp >= 5000) return "Tech Guru 🧠"
  if (xp >= 1000) return "Code Newbie 👶"
  return "Fresh Recruit 🌱"
}

export function getRandomMemeTemplates() {
  return [
    "When you finally fix that bug after 6 hours",
    "My code vs. Production",
    "Stack Overflow saves the day again",
    "Git commit messages be like",
    "The code I wrote vs. The code I documented",
    "Debugging in production",
    "When the code works but you don't know why",
    "Me trying to understand my own code from 6 months ago"
  ]
}
