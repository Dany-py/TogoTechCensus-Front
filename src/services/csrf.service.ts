
import axios, { AxiosError } from "axios";

export const apiClient = axios.create({
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
})

// Request interceptor: attach CSRF token and session-based auth headers
apiClient.interceptors.request.use((config) => {
  const csrfToken = getCookie('csrftoken');
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  } else {
    console.warn('[apiClient] CSRF token not found in cookies.');
  }

  // Forward session cookie automatically via withCredentials.
  // If a legacy token exists in localStorage, attach it as a fallback.
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor: handle authentication failures gracefully
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url ?? 'unknown URL';

    if (status === 403) {
      console.error(
        `[apiClient] 403 Forbidden on ${requestUrl}. ` +
        'The session cookie may be missing or the CSRF token is invalid. ' +
        'Redirecting to login.',
        { responseData: error.response?.data }
      );
      localStorage.removeItem('user');
      window.location.href = '/signin/';
    } else if (status === 401) {
      console.error(
        `[apiClient] 401 Unauthorized on ${requestUrl}. ` +
        'Session has expired or the user is not authenticated. ' +
        'Redirecting to login.',
        { responseData: error.response?.data }
      );
      localStorage.removeItem('user');
      window.location.href = '/signin/';
    }

    return Promise.reject(error);
  }
);

export function getCookie(name: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const returnCookie = parts.pop()?.split(';').shift()
    return returnCookie as unknown as string
  } else return ''
}

export async function initCSRF() {
    try {
        const url = import.meta.env.VITE_API_CSRF as string
        if(!url) throw new Error('VITE_API_CSRF is missing in .env')
        const response = await apiClient.get(url)
        console.log('Response csrf :', response.data)
    } catch (error) {
        console.log('Error :', error)
    }
}