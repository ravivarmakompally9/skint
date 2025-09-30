'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@/types'

interface AuthContextType {
  user: User | null
  login: (role: string, name: string) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check for existing session
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    }
  }, [])

  const login = (role: string, name: string) => {
    console.log('AuthProvider login called with:', { role, name })
    const newUser: User = {
      id: Date.now().toString(),
      email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
      name: name,
      role: role as any,
      avatar: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    console.log('Setting user:', newUser)
    setUser(newUser)
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(newUser))
      console.log('User saved to localStorage')
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
