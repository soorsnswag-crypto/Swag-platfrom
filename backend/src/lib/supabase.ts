import type { Env } from '../types';

interface QueryResult<T> {
  data: T[] | null;
  error: { message: string; code: string } | null;
  count: number | null;
}

function getAuthHeaders(env: Env, token?: string) {
  return {
    'Content-Type': 'application/json',
    apikey: env.SUPABASE_ANON_KEY,
    ...(token
      ? { Authorization: `Bearer ${token}` }
      : { Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` }),
  };
}

export async function query<T = Record<string, unknown>>(
  table: string,
  env: Env,
  options?: {
    select?: string;
    eq?: [string, unknown];
    order?: [string, 'asc' | 'desc'];
    range?: [number, number];
    limit?: number;
    offset?: number;
    token?: string;
  }
): Promise<QueryResult<T>> {
  const headers = getAuthHeaders(env, options?.token);
  const params = new URLSearchParams();

  if (options?.select) params.set('select', options.select);
  if (options?.eq) params.set(`${options.eq[0]}`, `eq.${options.eq[1]}`);
  if (options?.order) params.set('order', `${options.order[0]}.${options.order[1]}`);

  const url = `${env.SUPABASE_URL}/rest/v1/${table}?${params.toString()}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers,
    });

    const contentRange = res.headers.get('content-range');
    const count = contentRange ? parseInt(contentRange.split('/')[1], 10) : null;
    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: { message: (data as { message?: string }).message || 'Query failed', code: res.status.toString() },
        count: null,
      };
    }

    return { data: data as T[], error: null, count };
  } catch (err) {
    return {
      data: null,
      error: { message: err instanceof Error ? err.message : 'Network error', code: 'NETWORK' },
      count: null,
    };
  }
}

export async function insert<T = Record<string, unknown>>(
  table: string,
  values: Record<string, unknown>,
  env: Env,
  token?: string,
  returning: 'minimal' | 'representation' = 'representation'
): Promise<{ data: T | null; error: { message: string; code: string } | null }> {
  const headers = getAuthHeaders(env, token);
  headers['Prefer'] = `return=${returning}`;

  try {
    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(values),
    });

    const data = returning === 'representation' ? await res.json() : null;

    if (!res.ok) {
      return {
        data: null,
        error: { message: (data as { message?: string })?.message || 'Insert failed', code: res.status.toString() },
      };
    }

    return { data: data as T, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: err instanceof Error ? err.message : 'Network error', code: 'NETWORK' },
    };
  }
}

export async function update<T = Record<string, unknown>>(
  table: string,
  values: Record<string, unknown>,
  match: Record<string, unknown>,
  env: Env,
  token?: string
): Promise<{ data: T[] | null; error: { message: string; code: string } | null }> {
  const headers = getAuthHeaders(env, token);
  headers['Prefer'] = 'return=representation';

  const params = new URLSearchParams();
  for (const [key, val] of Object.entries(match)) {
    params.set(key, `eq.${val}`);
  }

  try {
    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${table}?${params.toString()}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: { message: (data as { message?: string })?.message || 'Update failed', code: res.status.toString() },
      };
    }

    return { data: data as T[], error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: err instanceof Error ? err.message : 'Network error', code: 'NETWORK' },
    };
  }
}

export async function remove(
  table: string,
  match: Record<string, unknown>,
  env: Env,
  token?: string
): Promise<{ error: { message: string; code: string } | null }> {
  const headers = getAuthHeaders(env, token);

  const params = new URLSearchParams();
  for (const [key, val] of Object.entries(match)) {
    params.set(key, `eq.${val}`);
  }

  try {
    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${table}?${params.toString()}`, {
      method: 'DELETE',
      headers,
    });

    if (!res.ok) {
      const data = await res.json();
      return {
        error: { message: (data as { message?: string })?.message || 'Delete failed', code: res.status.toString() },
      };
    }

    return { error: null };
  } catch (err) {
    return {
      error: { message: err instanceof Error ? err.message : 'Network error', code: 'NETWORK' },
    };
  }
}
