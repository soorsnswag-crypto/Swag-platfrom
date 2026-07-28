import type { User, Reel, Music, Comment, Wallet, WalletTransaction, Subscription, Notification, Conversation, Message } from './index'

export const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'swag_official',
    displayName: 'Swag Official',
    email: 'official@swag.com',
    bio: 'Official Swag Platform account',
    isVerified: true,
    isCreator: true,
    followerCount: 15400,
    followingCount: 128,
    reelCount: 45,
    totalLikes: 89200,
    avatarUrl: '',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'user-2',
    username: 'demo_creator',
    displayName: 'Demo Creator',
    email: 'demo@swag.com',
    bio: 'Creating amazing reels every day 🎬',
    isVerified: false,
    isCreator: true,
    followerCount: 3400,
    followingCount: 89,
    reelCount: 23,
    totalLikes: 28500,
    avatarUrl: '',
    createdAt: '2026-02-15T00:00:00Z',
  },
  {
    id: 'user-3',
    username: 'music_lover',
    displayName: 'Music Lover',
    email: 'music@swag.com',
    bio: 'Music is life 🎵',
    isVerified: false,
    isCreator: false,
    followerCount: 1200,
    followingCount: 234,
    reelCount: 8,
    totalLikes: 5600,
    avatarUrl: '',
    createdAt: '2026-03-10T00:00:00Z',
  },
  {
    id: 'user-4',
    username: 'travel_reels',
    displayName: 'Travel Reels',
    email: 'travel@swag.com',
    bio: 'Exploring the world one reel at a time 🌍',
    isVerified: false,
    isCreator: true,
    followerCount: 8900,
    followingCount: 156,
    reelCount: 67,
    totalLikes: 74300,
    avatarUrl: '',
    createdAt: '2026-01-20T00:00:00Z',
  },
  {
    id: 'current-user',
    username: 'current_user',
    displayName: 'You',
    email: 'you@swag.com',
    bio: 'This is your profile',
    isVerified: false,
    isCreator: false,
    followerCount: 340,
    followingCount: 120,
    reelCount: 15,
    totalLikes: 3200,
    avatarUrl: '',
    createdAt: '2026-06-01T00:00:00Z',
  },
]

export const mockMusic: Music[] = [
  { id: 'music-1', title: 'Summer Vibes', artist: 'Artist One', album: 'Summer Album', coverUrl: '', duration: 180, genre: 'pop', mood: 'happy', language: 'en', audioUrl: '', isTrending: true, usageCount: 15200 },
  { id: 'music-2', title: 'Night Rider', artist: 'Artist Two', album: 'Night Collection', coverUrl: '', duration: 240, genre: 'electronic', mood: 'energetic', language: 'en', audioUrl: '', isTrending: true, usageCount: 12300 },
  { id: 'music-3', title: 'Acoustic Morning', artist: 'Artist Three', album: 'Morning Sessions', coverUrl: '', duration: 200, genre: 'acoustic', mood: 'calm', language: 'en', audioUrl: '', isTrending: false, usageCount: 5400 },
  { id: 'music-4', title: 'Hip Hop Beat', artist: 'Artist Four', album: 'Beat Tape', coverUrl: '', duration: 160, genre: 'hiphop', mood: 'confident', language: 'en', audioUrl: '', isTrending: true, usageCount: 18900 },
  { id: 'music-5', title: 'Lo-fi Study', artist: 'Artist Five', album: 'Study Session', coverUrl: '', duration: 300, genre: 'lofi', mood: 'relaxed', language: 'en', audioUrl: '', isTrending: false, usageCount: 3200 },
  { id: 'music-6', title: 'Dance Fever', artist: 'DJ Beat', album: 'Party Mix', coverUrl: '', duration: 210, genre: 'dance', mood: 'energetic', language: 'en', audioUrl: '', isTrending: true, usageCount: 22100 },
  { id: 'music-7', title: 'Rainy Day', artist: 'Piano Keys', album: 'Peaceful', coverUrl: '', duration: 270, genre: 'classical', mood: 'calm', language: 'en', audioUrl: '', isTrending: false, usageCount: 4100 },
  { id: 'music-8', title: 'Sunset Drive', artist: 'Chill Wave', album: 'Evening', coverUrl: '', duration: 195, genre: 'r&b', mood: 'relaxed', language: 'en', audioUrl: '', isTrending: false, usageCount: 7800 },
]

export const mockReels: Reel[] = [
  { id: 'reel-1', userId: 'user-1', user: mockUsers[0], videoUrl: '', thumbnailUrl: '', caption: 'Welcome to Swag Platform! 🎉', music: mockMusic[0], duration: 15, likeCount: 1240, commentCount: 89, shareCount: 45, viewCount: 15200, saveCount: 230, isLiked: false, isSaved: false, createdAt: '2026-07-20T10:00:00Z' },
  { id: 'reel-2', userId: 'user-2', user: mockUsers[1], videoUrl: '', thumbnailUrl: '', caption: 'Check out this amazing view! #nature', music: mockMusic[1], duration: 30, likeCount: 890, commentCount: 67, shareCount: 34, viewCount: 9800, saveCount: 180, isLiked: true, isSaved: false, createdAt: '2026-07-21T14:30:00Z' },
  { id: 'reel-3', userId: 'user-4', user: mockUsers[3], videoUrl: '', thumbnailUrl: '', caption: 'Best travel destinations 2026 #travel 🌍', music: mockMusic[2], duration: 45, likeCount: 2100, commentCount: 156, shareCount: 89, viewCount: 28400, saveCount: 420, isLiked: false, isSaved: true, createdAt: '2026-07-22T08:15:00Z' },
  { id: 'reel-4', userId: 'user-1', user: mockUsers[0], videoUrl: '', thumbnailUrl: '', caption: 'New music drop! Check the description 🎵', music: mockMusic[3], duration: 20, likeCount: 3200, commentCount: 234, shareCount: 120, viewCount: 45000, saveCount: 560, isLiked: true, isSaved: true, createdAt: '2026-07-23T16:45:00Z' },
  { id: 'reel-5', userId: 'user-2', user: mockUsers[1], videoUrl: '', thumbnailUrl: '', caption: 'Easy dance tutorial - follow along! 💃', music: mockMusic[5], duration: 60, likeCount: 560, commentCount: 45, shareCount: 28, viewCount: 7200, saveCount: 95, isLiked: false, isSaved: false, createdAt: '2026-07-24T12:00:00Z' },
  { id: 'reel-6', userId: 'user-4', user: mockUsers[3], videoUrl: '', thumbnailUrl: '', caption: 'Sunset at the beach 🏖️ #peaceful', music: mockMusic[6], duration: 25, likeCount: 4500, commentCount: 312, shareCount: 200, viewCount: 62000, saveCount: 780, isLiked: false, isSaved: false, createdAt: '2026-07-25T19:30:00Z' },
  { id: 'reel-7', userId: 'user-2', user: mockUsers[1], videoUrl: '', thumbnailUrl: '', caption: 'Singing along to this amazing track! 🎤', music: mockMusic[3], duration: 35, likeCount: 1800, commentCount: 134, shareCount: 67, viewCount: 21500, saveCount: 310, isLiked: true, isSaved: false, createdAt: '2026-07-26T11:20:00Z' },
  { id: 'reel-8', userId: 'user-1', user: mockUsers[0], videoUrl: '', thumbnailUrl: '', caption: 'Behind the scenes of our latest shoot 🎬', music: mockMusic[7], duration: 40, likeCount: 980, commentCount: 78, shareCount: 42, viewCount: 12300, saveCount: 190, isLiked: false, isSaved: false, createdAt: '2026-07-27T09:00:00Z' },
]

export const mockComments: Comment[] = [
  { id: 'comment-1', userId: 'user-2', user: mockUsers[1], reelId: 'reel-1', content: 'Welcome! Love this platform!', likeCount: 12, isLiked: false, createdAt: '2026-07-20T11:00:00Z' },
  { id: 'comment-2', userId: 'user-3', user: mockUsers[2], reelId: 'reel-1', content: 'Amazing content! 🔥', likeCount: 8, isLiked: true, createdAt: '2026-07-20T12:30:00Z' },
  { id: 'comment-3', userId: 'user-4', user: mockUsers[3], reelId: 'reel-2', content: 'This is beautiful! Where is this place?', likeCount: 15, isLiked: false, createdAt: '2026-07-21T15:00:00Z' },
  { id: 'comment-4', userId: 'user-1', user: mockUsers[0], reelId: 'reel-3', content: 'Adding this to my bucket list! ✈️', likeCount: 22, isLiked: false, createdAt: '2026-07-22T09:30:00Z' },
  { id: 'comment-5', userId: 'user-3', user: mockUsers[2], reelId: 'reel-4', content: 'This song is fire! 🔥🔥🔥', likeCount: 45, isLiked: true, createdAt: '2026-07-23T17:00:00Z' },
]

export const mockWallet: Wallet = {
  balance: 150.00,
  lockedBalance: 25.00,
  totalEarned: 500.00,
  totalWithdrawn: 350.00,
}

export const mockTransactions: WalletTransaction[] = [
  { id: 'tx-1', type: 'credit', amount: 50.00, description: 'Monthly subscription revenue', status: 'completed', createdAt: '2026-07-25T10:00:00Z' },
  { id: 'tx-2', type: 'withdraw', amount: 100.00, description: 'Withdrawal to bank account', status: 'completed', createdAt: '2026-07-20T14:00:00Z' },
  { id: 'tx-3', type: 'credit', amount: 25.00, description: 'Creator earnings - July', status: 'completed', createdAt: '2026-07-15T08:00:00Z' },
  { id: 'tx-4', type: 'credit', amount: 12.00, description: 'Subscription payment', status: 'completed', createdAt: '2026-07-10T12:00:00Z' },
  { id: 'tx-5', type: 'debit', amount: 10.00, description: 'Premium subscription charge', status: 'completed', createdAt: '2026-07-05T09:00:00Z' },
  { id: 'tx-6', type: 'credit', amount: 8.50, description: 'Daily reward bonus', status: 'completed', createdAt: '2026-07-01T06:00:00Z' },
]

export const mockSubscriptions: Subscription[] = [
  { id: 'sub-1', subscriberId: 'current-user', creatorId: 'user-1', plan: 'premium', status: 'active', amount: 9.99, startedAt: '2026-06-15T00:00:00Z', expiresAt: '2026-08-15T00:00:00Z' },
  { id: 'sub-2', subscriberId: 'user-3', creatorId: 'user-1', plan: 'premium', status: 'active', amount: 9.99, startedAt: '2026-06-01T00:00:00Z' },
  { id: 'sub-3', subscriberId: 'user-3', creatorId: 'user-2', plan: 'creator_plus', status: 'active', amount: 19.99, startedAt: '2026-05-20T00:00:00Z' },
  { id: 'sub-4', subscriberId: 'user-2', creatorId: 'user-4', plan: 'premium', status: 'active', amount: 9.99, startedAt: '2026-07-01T00:00:00Z' },
]

export const mockNotifications: Notification[] = [
  { id: 'notif-1', type: 'like', title: 'New Like', body: 'Demo Creator liked your reel.', isRead: false, createdAt: '2026-07-27T10:30:00Z' },
  { id: 'notif-2', type: 'follow', title: 'New Follower', body: 'Music Lover started following you.', isRead: false, createdAt: '2026-07-27T09:15:00Z' },
  { id: 'notif-3', type: 'comment', title: 'New Comment', body: 'Travel Reels commented on your reel.', isRead: true, createdAt: '2026-07-26T16:00:00Z' },
  { id: 'notif-4', type: 'wallet', title: 'Earnings Update', body: 'Your wallet has been credited with $10.00.', isRead: false, createdAt: '2026-07-26T08:00:00Z' },
  { id: 'notif-5', type: 'subscription', title: 'Subscription Active', body: 'Your Premium subscription is now active.', isRead: true, createdAt: '2026-07-25T14:00:00Z' },
  { id: 'notif-6', type: 'like', title: 'New Like', body: 'Travel Reels liked your reel.', isRead: true, createdAt: '2026-07-24T11:00:00Z' },
  { id: 'notif-7', type: 'system', title: 'Welcome to Swag!', body: 'Thanks for joining. Start creating today!', isRead: true, createdAt: '2026-06-01T00:00:00Z' },
]

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1', type: 'direct', members: [mockUsers[0], mockUsers[4]],
    lastMessageAt: '2026-07-27T12:00:00Z',
    lastMessage: { id: 'msg-2', conversationId: 'conv-1', senderId: 'user-1', sender: mockUsers[0], type: 'text', content: 'Thank you so much! Really appreciate it.', createdAt: '2026-07-27T12:00:00Z' },
  },
  {
    id: 'conv-2', type: 'direct', members: [mockUsers[2], mockUsers[4]],
    lastMessageAt: '2026-07-26T18:30:00Z',
    lastMessage: { id: 'msg-4', conversationId: 'conv-2', senderId: 'user-3', sender: mockUsers[2], type: 'text', content: 'How do I become a creator on Swag?', createdAt: '2026-07-26T18:30:00Z' },
  },
]

export const mockMessages: Record<string, Message[]> = {
  'conv-1': [
    { id: 'msg-1', conversationId: 'conv-1', senderId: 'user-2', sender: mockUsers[1], type: 'text', content: 'Hey! Love your content! 🔥', createdAt: '2026-07-27T11:30:00Z' },
    { id: 'msg-2', conversationId: 'conv-1', senderId: 'user-1', sender: mockUsers[0], type: 'text', content: 'Thank you so much! Really appreciate it.', createdAt: '2026-07-27T12:00:00Z' },
  ],
  'conv-2': [
    { id: 'msg-3', conversationId: 'conv-2', senderId: 'current-user', sender: mockUsers[4], type: 'text', content: 'Hi! Welcome to Swag! 🎉', createdAt: '2026-07-26T18:00:00Z' },
    { id: 'msg-4', conversationId: 'conv-2', senderId: 'user-3', sender: mockUsers[2], type: 'text', content: 'How do I become a creator on Swag?', createdAt: '2026-07-26T18:30:00Z' },
  ],
}
