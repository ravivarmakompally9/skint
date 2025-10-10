'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HeroPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-sm text-blue-600">← Back</Link>
        <span className="text-base font-semibold">Prashiskshan</span>
        <div className="w-6" />
      </header>

      <section className="container mx-auto px-4 pt-8 pb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Powerful Features
        </h1>
        <p className="mt-3 text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
          Mobile-first dashboards, AI matching, real-time notifications, resume tools and more.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/features">
            <Button className="bg-sky-500 hover:bg-sky-600 text-white">Explore Full Features</Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="outline" className="border-gray-300 text-gray-800 hover:bg-gray-100">Create Account</Button>
          </Link>
        </div>
      </section>
    </main>
  )
}


