import { Outlet } from 'react-router-dom'
import { BottomNav } from '../shared/components/BottomNav'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-bg-primary pb-16">
      <Outlet />
      <BottomNav />
    </div>
  )
}
