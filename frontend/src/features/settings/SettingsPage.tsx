import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../shared/components/Button'
import { useTheme } from '../../hooks/useTheme'

interface SettingsItem {
  label: string
  icon: ReactNode
  onClick: () => void
  right?: string
  danger?: boolean
}

export function SettingsPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const sections: { title: string; items: SettingsItem[] }[] = [
    {
      title: 'Account',
      items: [
        { label: 'Edit Profile', icon: <EditIcon />, onClick: () => {} },
        { label: 'Change Password', icon: <LockIcon />, onClick: () => {} },
        { label: 'Delete Account', icon: <TrashIcon />, onClick: () => {}, danger: true },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { label: 'Dark Mode', icon: <ThemeIcon />, right: theme === 'dark' ? 'On' : 'Off', onClick: toggleTheme },
        { label: 'Language', icon: <LangIcon />, right: 'English', onClick: () => {} },
      ],
    },
    {
      title: 'Privacy',
      items: [
        { label: 'Private Profile', icon: <PrivacyIcon />, onClick: () => {} },
        { label: 'Blocked Users', icon: <BlockIcon />, onClick: () => {} },
      ],
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', icon: <HelpIcon />, onClick: () => {} },
        { label: 'Report a Problem', icon: <ReportIcon />, onClick: () => {} },
        { label: 'About', icon: <AboutIcon />, right: '1.0.0', onClick: () => {} },
      ],
    },
  ]

  return (
    <div className="max-w-lg mx-auto px-4 pt-4 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><path d="M19 12H5m7-7l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-title font-bold">Settings</h1>
      </div>

      {sections.map(section => (
        <div key={section.title} className="mb-6">
          <h3 className="text-caption text-text-muted font-medium uppercase tracking-wider mb-2 px-1">{section.title}</h3>
          <div className="space-y-0.5">
            {section.items.map(item => (
              <button key={item.label} onClick={item.onClick}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${item.danger ? 'hover:bg-danger/10' : 'hover:bg-bg-card'}`}
              >
                <span className={item.danger ? 'text-danger' : 'text-text-secondary'}>{item.icon}</span>
                <span className={`flex-1 text-left text-body ${item.danger ? 'text-danger' : ''}`}>{item.label}</span>
                {item.right && <span className="text-caption text-text-muted">{item.right}</span>}
              </button>
            ))}
          </div>
        </div>
      ))}

      {showLogoutConfirm ? (
        <div className="bg-bg-card rounded-xl p-4 text-center space-y-3">
          <p className="text-body">Are you sure you want to logout?</p>
          <div className="flex gap-2 justify-center">
            <Button variant="secondary" size="sm" onClick={() => setShowLogoutConfirm(false)}>Cancel</Button>
            <Button variant="danger" size="sm" onClick={() => navigate('/auth/login')}>Logout</Button>
          </div>
        </div>
      ) : (
        <Button variant="danger" fullWidth onClick={() => setShowLogoutConfirm(true)}>Logout</Button>
      )}
    </div>
  )
}

function EditIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> }
function LockIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg> }
function TrashIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg> }
function ThemeIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg> }
function LangIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20m-10 10a15.3 15.3 0 004-10 15.3 15.3 0 00-4-10 15.3 15.3 0 00-4 10 15.3 15.3 0 004 10z"/></svg> }
function PrivacyIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg> }
function BlockIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14"/></svg> }
function HelpIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg> }
function ReportIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/></svg> }
function AboutIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg> }
