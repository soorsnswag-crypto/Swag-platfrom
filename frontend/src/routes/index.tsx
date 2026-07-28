import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayout } from '../features/auth/AuthLayout'
import { LoginPage } from '../features/auth/LoginPage'
import { RegisterPage } from '../features/auth/RegisterPage'
import { ForgotPasswordPage } from '../features/auth/ForgotPasswordPage'
import { MainLayout } from './MainLayout'
import { HomePage } from '../features/home/HomePage'
import { SearchPage } from '../features/search/SearchPage'
import { WalletPage } from '../features/wallet/WalletPage'
import { ProfilePage } from '../features/profile/ProfilePage'
import { SettingsPage } from '../features/settings/SettingsPage'
import { NotificationsPage } from '../features/notifications/NotificationsPage'
import { SubscriptionPage } from '../features/subscription/SubscriptionPage'

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'create', element: <div className="flex items-center justify-center min-h-[60vh] text-text-muted">Create Reel - Coming Soon</div> },
      { path: 'wallet', element: <WalletPage /> },
      { path: 'subscription', element: <SubscriptionPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'profile/:id', element: <ProfilePage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])
