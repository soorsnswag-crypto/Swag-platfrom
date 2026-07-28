import type { User } from '../types'
import { mockUsers } from '../types/mockData'

const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

let currentUser: User | null = mockUsers[4]

export const mockAuthService = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    await delay(800)
    if (!email || !password) throw new Error('Email and password required')
    const user = mockUsers.find(u => u.email === email) || mockUsers[4]
    currentUser = user
    return { user, token: 'mock-jwt-token' }
  },

  async register(email: string, password: string, username: string): Promise<{ user: User; token: string }> {
    await delay(1000)
    if (!email || !password || !username) throw new Error('All fields required')
    const user: User = {
      id: `user-${Date.now()}`,
      username, displayName: username, email,
      isVerified: false, isCreator: false,
      followerCount: 0, followingCount: 0, reelCount: 0, totalLikes: 0,
      createdAt: new Date().toISOString(),
    }
    currentUser = user
    return { user, token: 'mock-jwt-token' }
  },

  async logout(): Promise<void> {
    await delay(300)
    currentUser = null
  },

  async getCurrentUser(): Promise<User | null> {
    await delay(200)
    return currentUser
  },

  async refreshToken(): Promise<string> {
    await delay(200)
    return 'mock-refreshed-token'
  },

  async resetPassword(email: string): Promise<void> {
    await delay(500)
    if (!email) throw new Error('Email required')
  },

  async updatePassword(password: string): Promise<void> {
    await delay(500)
    if (!password || password.length < 8) throw new Error('Password too short')
  },
}
