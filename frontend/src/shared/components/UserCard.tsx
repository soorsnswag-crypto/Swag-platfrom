import type { User } from '../../types'
import { Button } from './Button'

interface UserCardProps {
  user: User
  compact?: boolean
  onFollow?: () => void
  onClick?: () => void
}

export function UserCard({ user, compact, onFollow, onClick }: UserCardProps) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl bg-bg-card cursor-pointer hover:bg-[#202020] transition-colors ${compact ? '' : ''}`}
      onClick={onClick}
    >
      <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center text-title font-semibold shrink-0">
        {user.displayName[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-body font-medium truncate">{user.displayName}</span>
          {user.isVerified && <span className="text-primary text-small">✓</span>}
        </div>
        <span className="text-small text-text-muted">@{user.username}</span>
        {!compact && <p className="text-small text-text-secondary truncate mt-0.5">{user.bio}</p>}
      </div>
      {onFollow && (
        <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); onFollow() }}>
          Follow
        </Button>
      )}
    </div>
  )
}
