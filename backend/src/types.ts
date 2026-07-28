export interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  JWT_SECRET: string;
  APP_ENV: string;
  APP_NAME: string;
  API_VERSION: string;
  STORAGE_BUCKET: string;
  CLOUDFLARE_ACCOUNT_ID: string;
  R2_ENDPOINT: string;
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS_KEY: string;
}

export interface ApiResponse<T = unknown> {
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

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface AuthTokenPayload {
  sub: string;
  role: 'user' | 'creator' | 'moderator' | 'admin';
  email: string;
  iat?: number;
  exp?: number;
}
