import type { Music } from '../types'
import { mockMusic } from '../types/mockData'

const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

export const mockMusicService = {
  async getTrending(): Promise<Music[]> {
    await delay(400)
    return mockMusic.filter(m => m.isTrending)
  },

  async search(query: string): Promise<Music[]> {
    await delay(300)
    if (!query) return mockMusic
    const q = query.toLowerCase()
    return mockMusic.filter(m =>
      m.title.toLowerCase().includes(q) || m.artist.toLowerCase().includes(q)
    )
  },

  async getCategories(): Promise<string[]> {
    await delay(200)
    return ['pop', 'electronic', 'acoustic', 'hiphop', 'lofi', 'dance', 'classical', 'r&b']
  },

  async getByGenre(genre: string): Promise<Music[]> {
    await delay(300)
    return mockMusic.filter(m => m.genre === genre)
  },
}
