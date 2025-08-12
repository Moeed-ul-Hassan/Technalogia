import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Technalogia - Tech Community with Meme Vibes',
  description: 'Join the ultimate tech community where humor meets innovation. Share memes, discuss tech, showcase projects, and earn XP with fellow tech enthusiasts.',
  keywords: 'tech community, memes, programming, developers, tech humor, social media',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        {children}
      </body>
    </html>
  )
}
