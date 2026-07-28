import { useLocation, useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

interface NavItem {
  path: string
  label: string
  icon: ReactNode
  activeIcon: ReactNode
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: <HomeIcon />, activeIcon: <HomeIconFilled /> },
  { path: '/search', label: 'Search', icon: <SearchIcon />, activeIcon: <SearchIconFilled /> },
  { path: '/create', label: 'Create', icon: <CreateIcon />, activeIcon: <CreateIcon /> },
  { path: '/wallet', label: 'Wallet', icon: <WalletIcon />, activeIcon: <WalletIconFilled /> },
  { path: '/profile', label: 'Profile', icon: <ProfileIcon />, activeIcon: <ProfileIconFilled /> },
]

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg-primary/95 backdrop-blur-lg border-t border-border z-50">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16 px-2">
        {navItems.map(item => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[48px]"
            >
              {isActive ? item.activeIcon : item.icon}
              <span className={`text-[10px] ${isActive ? 'text-white font-medium' : 'text-text-muted'}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

function HomeIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A7A7A" strokeWidth="1.5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg> }
function HomeIconFilled() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg> }
function SearchIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A7A7A" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg> }
function SearchIconFilled() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg> }
function CreateIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7A7A7A" strokeWidth="1.5"><path d="M12 5v14m-7-7h14"/></svg> }
function WalletIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A7A7A" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/><circle cx="18" cy="14" r="2"/></svg> }
function WalletIconFilled() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/><circle cx="18" cy="14" r="2"/></svg> }
function ProfileIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A7A7A" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1"/></svg> }
function ProfileIconFilled() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1"/></svg> }
