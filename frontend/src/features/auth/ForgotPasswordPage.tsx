import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../shared/components/Button'
import { Input } from '../../shared/components/Input'
import { mockAuthService } from '../../services/mockAuthService'

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await mockAuthService.resetPassword(email)
      setSent(true)
    } catch {} finally { setLoading(false) }
  }

  if (sent) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
          <span className="text-success text-2xl">✓</span>
        </div>
        <h2 className="text-title font-medium">Check your email</h2>
        <p className="text-text-muted text-body">We sent a password reset link to {email}</p>
        <Button variant="text" onClick={() => navigate('/auth/login')}>Back to Login</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-text-secondary text-body mb-2">Enter your email and we'll send you a reset link.</p>
      <Input label="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Button type="submit" fullWidth loading={loading}>Send Reset Link</Button>
      <button type="button" onClick={() => navigate('/auth/login')} className="w-full text-center text-caption text-text-muted hover:text-white transition-colors">
        Back to Login
      </button>
    </form>
  )
}
