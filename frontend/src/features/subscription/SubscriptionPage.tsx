import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../shared/components/Button'
import { mockSubscriptions } from '../../types/mockData'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    features: ['Watch reels', 'Like & comment', 'Basic profile', 'Follow creators'],
    color: 'from-gray-600 to-gray-700',
  },
  {
    name: 'Premium',
    price: '$9.99',
    period: '/month',
    features: ['Ad-free experience', 'Exclusive content', 'Premium badge', 'Priority support', 'Advanced analytics'],
    color: 'from-primary to-purple-700',
    popular: true,
  },
  {
    name: 'Creator Plus',
    price: '$19.99',
    period: '/month',
    features: ['All Premium features', 'Higher upload limits', 'Revenue sharing', 'Creator insights', 'Dedicated support'],
    color: 'from-secondary to-blue-700',
  },
]

export function SubscriptionPage() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState<string>('free')

  const activeSub = mockSubscriptions.find(s => s.status === 'active')

  return (
    <div className="max-w-lg mx-auto px-4 pt-4 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><path d="M19 12H5m7-7l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-title font-bold">Subscription</h1>
      </div>

      {activeSub && (
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-4 mb-6">
          <p className="text-caption text-text-muted mb-1">Current Plan</p>
          <p className="text-title font-bold capitalize">{activeSub.plan}</p>
          <p className="text-small text-text-muted">
            {activeSub.expiresAt ? `Expires ${new Date(activeSub.expiresAt).toLocaleDateString()}` : 'Active'}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {plans.map(plan => (
          <div key={plan.name} onClick={() => setSelectedPlan(plan.name.toLowerCase().replace(' ', '_'))}
            className={`relative rounded-2xl p-5 cursor-pointer border-2 transition-all ${selectedPlan === plan.name.toLowerCase().replace(' ', '_') ? 'border-primary bg-bg-card' : 'border-border bg-bg-card hover:border-[#333]'}`}
          >
            {plan.popular && (
              <span className="absolute -top-3 right-4 bg-primary text-white text-small px-3 py-1 rounded-full font-medium">Popular</span>
            )}
            <h3 className="text-title font-bold mb-1">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-display font-bold">{plan.price}</span>
              <span className="text-text-muted text-caption">{plan.period}</span>
            </div>
            <ul className="space-y-2 mb-4">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-caption text-text-secondary">
                  <span className="text-success">✓</span> {f}
                </li>
              ))}
            </ul>
            <Button fullWidth variant={selectedPlan === plan.name.toLowerCase().replace(' ', '_') ? 'primary' : 'secondary'}>
              {activeSub?.plan === plan.name.toLowerCase().replace(' ', '_') ? 'Current Plan' : 'Subscribe'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
