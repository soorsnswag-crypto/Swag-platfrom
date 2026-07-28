import type { Reel, Comment } from '../types'
import { mockReels, mockComments } from '../types/mockData'

const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

export const mockReelService = {
  async getFeed(page = 1, limit = 10): Promise<{ data: Reel[]; total: number }> {
    await delay(500)
    const start = (page - 1) * limit
    return { data: mockReels.slice(start, start + limit), total: mockReels.length }
  },

  async getTrending(): Promise<Reel[]> {
    await delay(400)
    return [...mockReels].sort((a, b) => b.likeCount - a.likeCount).slice(0, 5)
  },

  async getReel(id: string): Promise<Reel | null> {
    await delay(300)
    return mockReels.find(r => r.id === id) || null
  },

  async getUserReels(userId: string): Promise<Reel[]> {
    await delay(400)
    return mockReels.filter(r => r.userId === userId)
  },

  async likeReel(reelId: string): Promise<void> {
    await delay(200)
    const reel = mockReels.find(r => r.id === reelId)
    if (reel) { reel.isLiked = true; reel.likeCount++ }
  },

  async unlikeReel(reelId: string): Promise<void> {
    await delay(200)
    const reel = mockReels.find(r => r.id === reelId)
    if (reel) { reel.isLiked = false; reel.likeCount = Math.max(0, reel.likeCount - 1) }
  },

  async saveReel(reelId: string): Promise<void> {
    await delay(200)
    const reel = mockReels.find(r => r.id === reelId)
    if (reel) { reel.isSaved = true; reel.saveCount++ }
  },

  async unsaveReel(reelId: string): Promise<void> {
    await delay(200)
    const reel = mockReels.find(r => r.id === reelId)
    if (reel) { reel.isSaved = false; reel.saveCount = Math.max(0, reel.saveCount - 1) }
  },

  async getComments(reelId: string): Promise<Comment[]> {
    await delay(300)
    return mockComments.filter(c => c.reelId === reelId)
  },

  async addComment(reelId: string, userId: string, content: string): Promise<Comment> {
    await delay(400)
    const comment: Comment = {
      id: `comment-${Date.now()}`, userId, reelId, content,
      user: { id: userId, username: 'current_user', displayName: 'You', email: '', isVerified: false, isCreator: false, followerCount: 0, followingCount: 0, reelCount: 0, totalLikes: 0, createdAt: '' },
      likeCount: 0, isLiked: false, createdAt: new Date().toISOString(),
    }
    return comment
  },
}
