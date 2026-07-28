import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockReelService } from '../../services/mockReelService'
import { mockUserService } from '../../services/mockUserService'
import { FeedSkeleton } from '../../shared/components/Loading'
import { EmptyState } from '../../shared/components/EmptyState'
import type { Reel } from '../../types'

export function HomePage() {
  const navigate = useNavigate()
  const [reels, setReels] = useState<Reel[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => { loadReels() }, [page])

  const loadReels = async () => {
    try {
      const { data, total } = await mockReelService.getFeed(page, 10)
      setReels(prev => [...prev, ...data])
      setHasMore(reels.length + data.length < total)
    } catch {} finally { setLoading(false) }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore && !loading) setPage(p => p + 1)
    })
    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [hasMore, loading])

  if (loading && reels.length === 0) return <FeedSkeleton />

  if (reels.length === 0) return <EmptyState title="No reels yet" description="Follow creators to see their content" actionLabel="Explore" onAction={() => navigate('/search')} />

  return (
    <div className="max-w-lg mx-auto">
      <div className="sticky top-0 bg-bg-primary/95 backdrop-blur-lg z-10 px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-title font-bold">Swag</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/notifications')} className="relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            </button>
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {reels.map(reel => (
          <ReelCard key={reel.id} reel={reel} onProfileClick={() => navigate(`/profile/${reel.userId}`)} />
        ))}
      </div>
      {hasMore && <div ref={loaderRef} className="py-4 text-center text-text-muted text-caption">Loading more...</div>}
    </div>
  )
}

function ReelCard({ reel, onProfileClick }: { reel: Reel; onProfileClick: () => void }) {
  const [liked, setLiked] = useState(reel.isLiked)
  const [saved, setSaved] = useState(reel.isSaved)
  const [likeCount, setLikeCount] = useState(reel.likeCount)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')

  const handleLike = async () => {
    if (liked) { await mockReelService.unlikeReel(reel.id); setLikeCount(p => p - 1) }
    else { await mockReelService.likeReel(reel.id); setLikeCount(p => p + 1) }
    setLiked(!liked)
  }

  const handleSave = async () => {
    if (saved) await mockReelService.unsaveReel(reel.id)
    else await mockReelService.saveReel(reel.id)
    setSaved(!saved)
  }

  return (
    <div className="py-4 px-4">
      <div className="flex items-center gap-3 mb-3 cursor-pointer" onClick={onProfileClick}>
        <div className="w-9 h-9 rounded-full bg-primary/30 flex items-center justify-center text-sm font-semibold">
          {reel.user.displayName[0]}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-medium text-body">{reel.user.displayName}</span>
            {reel.user.isVerified && <span className="text-primary text-small">✓</span>}
          </div>
          <span className="text-small text-text-muted">@{reel.user.username}</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); mockUserService.followUser(reel.userId) }} className="text-primary text-caption font-medium">Follow</button>
      </div>

      <div className="aspect-[9/16] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-3 flex items-center justify-center relative group cursor-pointer">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="#FFFFFF" opacity="0.5" className="group-hover:opacity-80 transition-opacity"><path d="M8 5v14l11-7z"/></svg>
        <span className="absolute top-3 right-3 text-small text-white/70">{reel.duration}s</span>
        {reel.music && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/40 rounded-full px-3 py-1">
            <span className="text-small text-white/80">🎵 {reel.music.title}</span>
          </div>
        )}
      </div>

      {reel.caption && <p className="text-body mb-3">{reel.caption}</p>}

      <div className="flex items-center gap-5 mb-3">
        <button onClick={handleLike} className="flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill={liked ? '#FF4D8D' : 'none'} stroke={liked ? '#FF4D8D' : '#B3B3B3'} strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          <span className="text-caption">{likeCount}</span>
        </button>
        <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-1.5 text-text-secondary hover:text-white transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B3B3B3" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          <span className="text-caption">{reel.commentCount}</span>
        </button>
        <button className="flex items-center gap-1.5 text-text-secondary hover:text-white transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B3B3B3" strokeWidth="1.5"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/></svg>
          <span className="text-caption">{reel.shareCount}</span>
        </button>
        <button onClick={handleSave} className="ml-auto text-text-secondary hover:text-white transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill={saved ? '#FFFFFF' : 'none'} stroke="#B3B3B3" strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
        </button>
      </div>

      {showComments && (
        <div className="bg-bg-card rounded-xl p-3 mt-2">
          <div className="text-small text-text-muted mb-2">Comments</div>
          <div className="flex gap-2">
            <input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Add a comment..." className="flex-1 bg-bg-secondary rounded-lg px-3 py-2 text-body text-white placeholder:text-text-disabled outline-none" />
            <button onClick={async () => { if (commentText.trim()) { await mockReelService.addComment(reel.id, 'current-user', commentText); setCommentText('') } }} className="text-primary font-medium text-caption">Post</button>
          </div>
        </div>
      )}
    </div>
  )
}
