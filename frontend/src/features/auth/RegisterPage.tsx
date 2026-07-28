import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../shared/components/Button'
import { Input } from '../../shared/components/Input'
import { mockAuthService } from '../../services/mockAuthService'

export function RegisterPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    try {
      await mockAuthService.register(email, password, username)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Username" placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <Input label="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input label="Password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required helperText="At least 8 characters with uppercase, lowercase and number" />
      {error && <p className="text-danger text-caption">{error}</p>}
      <Button type="submit" fullWidth loading={loading}>Create Account</Button>
      <p className="text-center text-caption text-text-muted">
        Already have an account?{' '}
        <button type="button" onClick={() => navigate('/auth/login')} className="text-primary hover:underline">Sign in</button>
      </p>
    </form>
  )
}
