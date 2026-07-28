export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  coverUrl?: string;
  bio?: string;
  website?: string;
  location?: string;
  isVerified: boolean;
  isCreator: boolean;
  followerCount: number;
  followingCount: number;
  reelCount: number;
  totalLikes: number;
  createdAt: string;
}

export interface Reel {
  id: string;
  userId: string;
  user: User;
  videoUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  music?: Music;
  duration: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  viewCount: number;
  saveCount: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: string;
}

export interface Music {
  id: string;
  title: string;
  artist: string;
  album?: string;
  coverUrl?: string;
  duration: number;
  genre?: string;
  mood?: string;
  language?: string;
  audioUrl: string;
  isTrending: boolean;
  usageCount: number;
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  reelId: string;
  parentId?: string;
  content: string;
  likeCount: number;
  isLiked: boolean;
  createdAt: string;
}

export interface Wallet {
  balance: number;
  lockedBalance: number;
  totalEarned: number;
  totalWithdrawn: number;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit' | 'withdraw' | 'refund' | 'subscription' | 'transfer';
  amount: number;
  description?: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
}

export interface Subscription {
  id: string;
  subscriberId: string;
  creatorId: string;
  plan: 'free' | 'premium' | 'creator_plus';
  status: 'active' | 'cancelled' | 'expired' | 'paused';
  amount: number;
  startedAt: string;
  expiresAt?: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'subscription' | 'wallet' | 'reel' | 'system';
  title: string;
  body?: string;
  isRead: boolean;
  createdAt: string;
  data?: Record<string, unknown>;
}

export interface Conversation {
  id: string;
  type: 'direct' | 'group';
  name?: string;
  lastMessage?: Message;
  lastMessageAt?: string;
  members: User[];
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender: User;
  type: 'text' | 'image' | 'video' | 'audio';
  content?: string;
  mediaUrl?: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasMore?: boolean;
  };
}
