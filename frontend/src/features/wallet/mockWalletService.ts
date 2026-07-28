const delay = (ms: number) => new Promise(r => setTimeout(r, ms))
import { mockTransactions } from '../../types/mockData'
import type { WalletTransaction } from '../../types'

export const mockWalletService = {
  async getTransactions(): Promise<WalletTransaction[]> {
    await delay(300)
    return [...mockTransactions].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  },
}
