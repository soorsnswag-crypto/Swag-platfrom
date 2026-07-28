import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../shared/components/Button'
import { Spinner } from '../../shared/components/Loading'
import { EmptyState } from '../../shared/components/EmptyState'
import { ErrorState } from '../../shared/components/ErrorState'
import { mockNotificationService } from '../../services/mockNotificationService'
import type { Notification } from '../../types'

const typeIcons: Record<string, string> = {
  like: '♥', comment: '💬', follow: '👤', mention: '@',
  subscription: '⭐', wallet: '💰', reel: '🎬', system: '🔔',
}

const typeColors: Record<string, string> = {
  like: 'bg-accent/20 text-accent', comment: 'bg-secondary/20 text-secondary',
  follow: 'bg-primary/20 text-primary', subscription: 'bg-warning/20 text-warning',
  wallet: 'bg-success/20 text-success', system: 'bg-text-muted/20 text-text-muted',
  reel: 'bg-primary/20 text-primary', mention: 'bg-secondary/20 text-secondary',
}

export function NotificationsPage() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    mockNotificationService.getAll()
      .then(setNotifications)
      .catch(() => setError('Failed to load notifications'))
      .finally(() => setLoading(false))
  }, [])

  const handleMarkAllRead = async () => {
    await mockNotificationService.markAllAsRead()
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }

  const handleMarkRead = async (id: string) => {
    await mockNotificationService.markAsRead(id)
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
  }

  if (loading) return <Spinner />
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />

  return (
    <div className="max-w-lg mx-auto px-4 pt-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><path d="M19 12H5m7-7l-7 7 7 7"/></svg>
          </button>
          <h1 className="text-title font-bold">Notifications</h1>
        </div>
        {notifications.some(n => !n.isRead) && (
          <button onClick={handleMarkAllRead} className="text-caption text-primary">Mark all read</button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState title="No notifications" description="You're all caught up!" />
      ) : (
        <div className="space-y-1">
          {notifications.map(notif => (
            <div key={notif.id} onClick={() => handleMarkRead(notif.id)}
              className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors ${notif.isRead ? '' : 'bg-bg-card'} hover:bg-bg-card`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${typeColors[notif.type] || typeColors.system}`}>
                {typeIcons[notif.type] || '🔔'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-body font-medium">{notif.title}</p>
                {notif.body && <p className="text-caption text-text-secondary">{notif.body}</p>}
                <p className="text-small text-text-muted mt-1">
                  {new Date(notif.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                </p>
              </div>
              {!notif.isRead && <div className="w-2 h-2 rounded-full bg-primary mt-3 shrink-0" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
