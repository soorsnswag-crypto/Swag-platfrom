import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../shared/components/Button'
import { Spinner } from '../../shared/components/Loading'
import { ErrorState } from '../../shared/components/ErrorState'
import { UserCard } from '../../shared/components/UserCard'
import { mockUserService } from '../../services/mockUserService'
import { mockReelService } from '../../services/mockReelService'
import { mockUsers } from '../../types/mockData'
import type { User, Reel } from '../../types'

export function ProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [reels, setReels] = useState<Reel[]>([])
  const [followers, setFollowers] = useState<User[]>([])
  const [following, setFollowing] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'reels' | 'saved'>('reels')
  const [isFollowing, setIsFollowing] = useState(false)

  const isOwnProfile = !id || id === 'current-user'
  const profileId = isOwnProfile ? mockUsers[4].id : id!

  useEffect(() => {
    Promise.all([
      mockUserService.getProfile(profileId),
      mockReelService.getUserReels(profileId),
      mockUserService.getFollowers(profileId),
      mockUserService.getFollowing(profileId),
    ])
      .then(([u, r, fol, fing]) => {
        if (!u) { setError('User not found'); return }
        setUser(u); setReels(r); setFollowers(fol); setFollowing(fing)
      })
      .catch(() => setError('Failed to load profile'))
      .finally(() => setLoading(false))
  }, [profileId])

  if (loading) return <Spinner />
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />
  if (!user) return null

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><path d="M19 12H5m7-7l-7 7 7 7"/></svg>
          </button>
          {isOwnProfile && (
            <button onClick={() => navigate('/settings')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            </button>
          )}
        </div>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/30 flex items-center justify-center text-heading font-bold shrink-0">
            {user.displayName[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <h2 className="text-title font-bold">{user.displayName}</h2>
              {user.isVerified && <span className="text-primary">✓</span>}
            </div>
            <p className="text-small text-text-muted mb-1">@{user.username}</p>
            {user.bio && <p className="text-caption text-text-secondary mb-2">{user.bio}</p>}
            <div className="flex gap-4 text-caption mb-3">
              <span><strong className="text-white">{user.followingCount}</strong> <span className="text-text-muted">Following</span></span>
              <span><strong className="text-white">{user.followerCount}</strong> <span className="text-text-muted">Followers</span></span>
              <span><strong className="text-white">{user.reelCount}</strong> <span className="text-text-muted">Reels</span></span>
            </div>
            {isOwnProfile ? (
              <Button variant="secondary" size="sm" onClick={() => navigate('/settings')}>Edit Profile</Button>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" variant={isFollowing ? 'secondary' : 'primary'} onClick={() => { setIsFollowing(!isFollowing) }}>
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button size="sm" variant="secondary">Message</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex border-b border-border px-4 mb-4">
        {(['reels', 'saved'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-caption font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-primary text-white' : 'border-transparent text-text-muted'}`}
          >
            {tab === 'reels' ? 'Reels' : 'Saved'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1 px-1">
        {(activeTab === 'reels' ? reels : []).map(reel => (
          <div key={reel.id} className="aspect-[9/16] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center relative group cursor-pointer">
            <span className="absolute top-2 right-2 text-small text-white/70">{reel.duration}s</span>
            <div className="absolute bottom-2 left-2 right-2 flex justify-between text-small text-white/70">
              <span>♥ {reel.likeCount}</span>
              <span>👁 {reel.viewCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
