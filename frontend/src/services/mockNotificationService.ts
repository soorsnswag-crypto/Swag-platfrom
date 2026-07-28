import type { Notification } from '../types'
import { mockNotifications } from '../types/mockData'

const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

export const mockNotificationService = {
  async getAll(): Promise<Notification[]> {
    await delay(400)
    return [...mockNotifications].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  },

  async getUnreadCount(): Promise<number> {
    await delay(200)
    return mockNotifications.filter(n => !n.isRead).length
  },

  async markAsRead(id: string): Promise<void> {
    await delay(200)
    const notif = mockNotifications.find(n => n.id === id)
    if (notif) notif.isRead = true
  },

  async markAllAsRead(): Promise<void> {
    await delay(300)
    mockNotifications.forEach(n => { n.isRead = true })
  },
}
