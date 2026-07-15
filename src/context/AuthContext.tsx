import { createContext, useContext, useState, type ReactNode } from 'react'
import type { AuthUser } from '@/types'

const STORAGE_KEY = 'flowers-pos.auth-user'

interface AuthContextValue {
  isAuthenticated: boolean
  currentUser: AuthUser | null
  login: (user: AuthUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(readStoredUser)

  function login(user: AuthUser) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    setCurrentUser(user)
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    setCurrentUser(null)
  }

  const value = { isAuthenticated: currentUser !== null, currentUser, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
