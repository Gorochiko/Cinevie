
/**
 * Custom error class for API-related errors.
 */
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * List of public routes that do not require authentication.
 */
const PUBLIC_ROUTES = [
  '/auth/signin',
  '/auth/re-verify',
  '/user',
  '/auth/verify',
  '/auth/signUp',
  '/auth/signout',
  '/films/getFilms',
  '/films/getfilms/:id',
  'showtime/FindOnetime/:id',
  'showtime/findAlltime',
  '/theaters/findtheater',
  '/food/findallFood'
] as const;

interface NextFetchOptions {
  next?: {
    tags?: string[];
    revalidate?: number;
  };
}

/**
 * Checks if a given URL is a public route.
 */
const isPublicRoute = (url: string): boolean => {
  const normalizedUrl = url.replace(/^\/api/, '');
  return PUBLIC_ROUTES.some(route => {
    if (route.endsWith('*')) {
      const baseRoute = route.slice(0, -1);
      return normalizedUrl.startsWith(baseRoute);
    }
    if (route.includes(':')) {
      const routePattern = new RegExp('^' + route.replace(/:[^/]+/g, '([^/]+)') + '$');
      return routePattern.test(normalizedUrl);
    }
    return normalizedUrl === route;
  });
};

/**
 * Fetches the authentication session for the current user.
 */
const getAuthSession = async () => {
  try {
    if (typeof window !== 'undefined') {
      const { getSession } = await import('next-auth/react');
      return await getSession();
    }
    const { auth } = await import('../lib/auth');
    return await auth();
  } catch (error) {
    console.error('Session fetch error:', error);
    return null;
  }
};

/**
 * Gets the base API URL
 */
const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'https://cinevie.onrender.com';
};

/**
 * Handles API responses
 */
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new APIError(
      errorData.message || response.statusText,
      response.status,
      errorData
    );
  }
  return response.json();
};

/**
 * Adds authorization header to request if needed
 */
const addAuthHeader = async (config: RequestInit, url: string): Promise<RequestInit> => {
  // Skip auth for public routes
  if (isPublicRoute(url)) {
    return config;
  }

  if (config.headers && 'Authorization' in config.headers) {
    return config;
  }

  const session = await getAuthSession();
  if (!session?.user?.access_token) {
    throw new APIError('No authentication token found', 401);
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${session.user.access_token}`,
    },
  };
};

/**
 * Fetches data from the specified endpoint.
 */
export const fetchData = async <T>(
  endpoint: string,
  config: RequestInit & NextFetchOptions = {}
): Promise<T> => {
  try {
    const url = `${getBaseUrl()}/api${endpoint}`;
    const { next, ...fetchConfig } = config;

    const finalConfig = await addAuthHeader(fetchConfig, endpoint);

    const response = await fetch(url, {
      ...finalConfig,
      next: next // Chỉ cần truyền next options ở đây
    });

    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof APIError) {
      console.error("API Error:", error.message);
      throw error;
    }
    console.error("Unknown error:", error);
    throw new APIError("Unknown error", 500);
  }
};

/**
 * Sends a POST request to the specified endpoint.
 */
export const postData = async <T>(
  endpoint: string,
  data: Record<string, any> | FormData,
  requireAuth = true,
): Promise<T> => {
  try {
    const isFormData = data instanceof FormData;
    const config: RequestInit = {
      method: 'POST',
      headers: {
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...(!requireAuth && { Authorization: '' }),
      },
      body: isFormData ? data : JSON.stringify(data),
    };

    const url = `${getBaseUrl()}/api${endpoint}`;
    const finalConfig = requireAuth ? await addAuthHeader(config, endpoint) : config;
    const response = await fetch(url, finalConfig);
    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof APIError) {
      console.error('Error posting data:', error.message);
      throw error;
    }
    console.error('Unknown error:', error);
    throw new APIError('Unknown error', 500);
  }
};

/**
 * Sends a PATCH request to the specified endpoint.
 */
export const patchData = async <T>(
  endpoint: string,
  data: Record<string, any>,
  requireAuth = true,

): Promise<T> => {
  try {
    const config: RequestInit & NextFetchOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(!requireAuth && { Authorization: '' }),
      },
      body: JSON.stringify(data),
     
    };

    const url = `${getBaseUrl()}/api${endpoint}`;
    const finalConfig = requireAuth ? await addAuthHeader(config, endpoint) : config;
    const response = await fetch(url, finalConfig);
    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof APIError) {
      console.error('Error patching data:', error.message);
      throw error;
    }
    console.error('Unknown error:', error);
    throw new APIError('Unknown error', 500);
  }
};

/**
 * Sends a DELETE request to the specified endpoint.
 */
export const deleteData = async <T>(
  endpoint: string,
  requireAuth = true,

): Promise<T> => {
  try {
    const config: RequestInit & NextFetchOptions = {
      method: 'DELETE',
      headers: {
        ...(!requireAuth && { Authorization: '' }),
      },
    
    };

    const url = `${getBaseUrl()}/api${endpoint}`;
    const finalConfig = requireAuth ? await addAuthHeader(config, endpoint) : config;
    const response = await fetch(url, finalConfig);
    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof APIError) {
      console.error('Error deleting data:', error.message);
      throw error;
    }
    console.error('Unknown error:', error);
    throw new APIError('Unknown error', 500);
  }
};