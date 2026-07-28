import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../shared/components/Input'
import { UserCard } from '../../shared/components/UserCard'
import { Spinner } from '../../shared/components/Loading'
import { mockUserService } from '../../services/mockUserService'
import { mockMusicService } from '../../services/mockMusicService'
import { mockReelService } from '../../services/mockReelService'
import type { User, Music, Reel } from '../../types'

export function SearchPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'users' | 'music' | 'reels'>('users')
  const [users, setUsers] = useState<User[]>([])
  const [music, setMusic] = useState<Music[]>([])
  const [reels, setReels] = useState<Reel[]>([])
  const [trendingMusic, setTrendingMusic] = useState<Music[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => { mockMusicService.getTrending().then(setTrendingMusic) }, [])

  useEffect(() => {
    if (query.length < 2) { setUsers([]); setMusic([]); setReels([]); return }
    setLoading(true)
    const t = setTimeout(async () => {
      try {
        if (activeTab === 'users') setUsers(await mockUserService.searchUsers(query))
        else if (activeTab === 'music') setMusic(await mockMusicService.search(query))
        else {
          const { data } = await mockReelService.getFeed(1, 50)
          setReels(data.filter(r => r.caption?.toLowerCase().includes(query.toLowerCase())))
        }
      } catch {} finally { setLoading(false) }
    }, 400)
    return () => clearTimeout(t)
  }, [query, activeTab])

  return (
    <div className="max-w-lg mx-auto px-4 pt-4">
      <Input placeholder="Search users, music, reels..." value={query} onChange={e => setQuery(e.target.value)} className="mb-4" />

      <div className="flex gap-1 mb-4 bg-bg-card rounded-xl p-1">
        {(['users', 'music', 'reels'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg text-caption font-medium transition-colors ${activeTab === tab ? 'bg-primary text-white' : 'text-text-muted'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {loading ? <Spinner /> : query.length < 2 ? (
        <div>
          <h3 className="text-title font-medium mb-3">Trending Music</h3>
          <div className="space-y-2">
            {trendingMusic.map(m => (
              <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl bg-bg-card">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#00D1FF"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{m.title}</p>
                  <p className="text-small text-text-muted">{m.artist}</p>
                </div>
                <span className="text-small text-text-muted">{Math.floor(m.duration / 60)}:{(m.duration % 60).toString().padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {activeTab === 'users' && <div className="space-y-1">{users.map(u => <UserCard key={u.id} user={u} onClick={() => navigate(`/profile/${u.id}`)} />)}</div>}
          {activeTab === 'music' && <div className="space-y-2">{music.map(m => (
            <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl bg-bg-card cursor-pointer hover:bg-[#202020] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#00D1FF"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{m.title}</p>
                <p className="text-small text-text-muted">{m.artist}</p>
              </div>
              <span className="text-small text-text-muted">{Math.floor(m.duration / 60)}:{(m.duration % 60).toString().padStart(2, '0')}</span>
            </div>
          ))}</div>}
          {activeTab === 'reels' && <div className="space-y-1">{reels.map(r => (
            <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl bg-bg-card cursor-pointer hover:bg-[#202020] transition-colors">
              <div className="w-14 h-24 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{r.user.displayName}</p>
                <p className="text-small text-text-muted truncate">{r.caption}</p>
                <div className="flex gap-3 mt-1 text-small text-text-muted">
                  <span>♥ {r.likeCount}</span>
                  <span>👁 {r.viewCount}</span>
                </div>
              </div>
            </div>
          ))}</div>}
        </>
      )}
    </div>
  )
}
