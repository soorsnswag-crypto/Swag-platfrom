import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../shared/components/Button'
import { Spinner } from '../../shared/components/Loading'
import { EmptyState } from '../../shared/components/EmptyState'
import { ErrorState } from '../../shared/components/ErrorState'
import { mockWallet } from '../../types/mockData'
import { mockWalletService } from './mockWalletService'
import type { WalletTransaction } from '../../types'

export function WalletPage() {
  const navigate = useNavigate()
  const [wallet] = useState(mockWallet)
  const [transactions, setTransactions] = useState<WalletTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    mockWalletService.getTransactions()
      .then(setTransactions)
      .catch(() => setError('Failed to load transactions'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-lg mx-auto px-4 pt-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-heading font-bold">Wallet</h1>
      </div>

      <div className="bg-gradient-to-br from-primary to-purple-700 rounded-2xl p-6 mb-6">
        <p className="text-small text-white/70 mb-1">Available Balance</p>
        <h2 className="text-display font-bold text-white mb-4">${wallet.balance.toFixed(2)}</h2>
        <div className="flex gap-2">
          <Button variant="primary" size="sm" className="bg-white text-primary hover:bg-white/90">Deposit</Button>
          <Button variant="secondary" size="sm" className="border-white/30 text-white">Withdraw</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-bg-card rounded-xl p-3 text-center">
          <p className="text-body font-semibold">${wallet.totalEarned.toFixed(2)}</p>
          <p className="text-small text-text-muted">Earned</p>
        </div>
        <div className="bg-bg-card rounded-xl p-3 text-center">
          <p className="text-body font-semibold">${wallet.totalWithdrawn.toFixed(2)}</p>
          <p className="text-small text-text-muted">Withdrawn</p>
        </div>
        <div className="bg-bg-card rounded-xl p-3 text-center">
          <p className="text-body font-semibold">${wallet.lockedBalance.toFixed(2)}</p>
          <p className="text-small text-text-muted">Locked</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-title font-medium">Transactions</h3>
        <button onClick={() => navigate('/subscription')} className="text-caption text-primary">Subscription</button>
      </div>

      {loading ? <Spinner /> : error ? <ErrorState message={error} onRetry={() => window.location.reload()} /> : transactions.length === 0 ? (
        <EmptyState title="No transactions" description="Your transaction history will appear here" />
      ) : (
        <div className="space-y-2">
          {transactions.map(tx => (
            <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-bg-card">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${tx.type === 'credit' || tx.type === 'refund' ? 'bg-success/20' : tx.type === 'debit' || tx.type === 'withdraw' ? 'bg-danger/20' : 'bg-primary/20'}`}>
                  <span className={`text-sm ${tx.type === 'credit' || tx.type === 'refund' ? 'text-success' : tx.type === 'debit' || tx.type === 'withdraw' ? 'text-danger' : 'text-primary'}`}>
                    {tx.type === 'credit' || tx.type === 'refund' ? '+' : '-'}
                  </span>
                </div>
                <div>
                  <p className="text-body font-medium">{tx.description}</p>
                  <p className="text-small text-text-muted">{new Date(tx.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${tx.type === 'credit' || tx.type === 'refund' ? 'text-success' : 'text-danger'}`}>
                  {tx.type === 'credit' || tx.type === 'refund' ? '+' : '-'}${tx.amount.toFixed(2)}
                </p>
                <p className={`text-small capitalize ${tx.status === 'completed' ? 'text-success' : tx.status === 'pending' ? 'text-warning' : 'text-text-muted'}`}>
                  {tx.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
