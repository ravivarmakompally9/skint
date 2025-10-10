'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
            Prashiskshan
          </span>
        </div>
        <Link href="/auth/login">
          <Button variant="ghost" className="text-navy-700 dark:text-white">Sign In</Button>
        </Link>
      </header>

      <section className="container mx-auto px-4 pt-16 pb-10 md:pt-24 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Placement made simple
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-700 max-w-md mx-auto">
          AI-powered internships, training & placements. Designed mobile-first for a smooth app-like experience.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/get-started">
            <Button className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white">Get Started</Button>
          </Link>
          <Link href="/hero">
            <Button variant="outline" className="w-full sm:w-auto border-gray-300 text-gray-800 hover:bg-gray-100">See Features</Button>
          </Link>
        </div>
      </section>

      <nav className="container mx-auto px-4 pb-10 grid grid-cols-2 gap-3 max-w-md">
        <Link href="/dashboard" className="block p-4 rounded-xl bg-white shadow-sm text-left border border-gray-100">
          <div className="text-sm text-gray-500">Dashboards</div>
          <div className="font-semibold">Students • Faculty • Recruiters</div>
        </Link>
        <Link href="/features" className="block p-4 rounded-xl bg-white shadow-sm text-left border border-gray-100">
          <div className="text-sm text-gray-500">Explore</div>
          <div className="font-semibold">Core Features</div>
        </Link>
      </nav>

      <footer className="py-6 text-center text-sm text-gray-500">
        © 2024 Prashiskshan. All rights reserved.
      </footer>
    </main>
  )
}
