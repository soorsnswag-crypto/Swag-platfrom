import type { User } from '../types'
import { mockUsers } from '../types/mockData'

const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

export const mockUserService = {
  async getProfile(id: string): Promise<User | null> {
    await delay(300)
    return mockUsers.find(u => u.id === id) || null
  },

  async updateProfile(id: string, data: Partial<User>): Promise<User> {
    await delay(500)
    const user = mockUsers.find(u => u.id === id)
    if (!user) throw new Error('User not found')
    Object.assign(user, data)
    return user
  },

  async followUser(id: string): Promise<void> {
    await delay(300)
    const user = mockUsers.find(u => u.id === id)
    if (user) user.followerCount++
  },

  async unfollowUser(id: string): Promise<void> {
    await delay(300)
    const user = mockUsers.find(u => u.id === id)
    if (user) user.followerCount = Math.max(0, user.followerCount - 1)
  },

  async searchUsers(query: string): Promise<User[]> {
    await delay(400)
    if (!query) return []
    const q = query.toLowerCase()
    return mockUsers.filter(u =>
      u.username.toLowerCase().includes(q) || u.displayName.toLowerCase().includes(q)
    )
  },

  async getFollowers(id: string): Promise<User[]> {
    await delay(300)
    return mockUsers.filter(u => u.id !== id).slice(0, 3)
  },

  async getFollowing(id: string): Promise<User[]> {
    await delay(300)
    return mockUsers.filter(u => u.id !== id).slice(0, 2)
  },
}
