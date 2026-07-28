import type { Env } from '../types';

interface AuthApiResponse<T> {
  data?: T;
  error?: { message: string; status: number };
}

export async function authPost<T>(
  path: string,
  body: Record<string, unknown>,
  env: Env,
  useServiceKey: boolean = false
): Promise<AuthApiResponse<T>> {
  const token = useServiceKey ? env.SUPABASE_SERVICE_ROLE_KEY : env.SUPABASE_ANON_KEY;
  try {
    const res = await fetch(`${env.SUPABASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: { message: data.msg || data.error_description || data.message || 'Request failed', status: res.status } };
    }
    return { data: data as T };
  } catch (err) {
    return { error: { message: err instanceof Error ? err.message : 'Network error', status: 500 } };
  }
}

export async function authGet<T>(
  path: string,
  env: Env,
  userToken?: string
): Promise<AuthApiResponse<T>> {
  const token = userToken || env.SUPABASE_SERVICE_ROLE_KEY;
  try {
    const res = await fetch(`${env.SUPABASE_URL}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apikey: env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: { message: data.msg || data.message || 'Request failed', status: res.status } };
    }
    return { data: data as T };
  } catch (err) {
    return { error: { message: err instanceof Error ? err.message : 'Network error', status: 500 } };
  }
}
