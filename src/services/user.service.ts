import { AxiosError } from 'axios';
import { apiClient } from './csrf.service';

/**
 * Shape of the user object returned by `/api/users/me/`.
 * Extend this interface as the backend schema evolves.
 */
export interface UserData {
    id: number | string;
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    [key: string]: unknown;
}

/**
 * Fetch the currently authenticated user from the backend.
 *
 * The Django backend identifies the user via the `sessionid` HttpOnly
 * cookie that is automatically attached to every request because
 * `apiClient` is created with `withCredentials: true`.
 *
 * @returns The user data object on success, or `null` if the user is not
 *          authenticated or an error occurs.
 */
export async function fetchCurrentUser(): Promise<UserData | null> {
    const url = import.meta.env.VITE_API_USER as string;

    if (!url) {
        console.error('[fetchCurrentUser] VITE_API_USER is not defined in .env');
        return null;
    }

    try {
        const response = await apiClient.get<UserData>(url);

        if (!response.data) {
            console.warn('[fetchCurrentUser] Received an empty response from', url);
            return null;
        }

        return response.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            const status = error.response?.status;

            if (status === 401 || status === 403) {
                // Expected when the user is not authenticated — not a crash.
                console.warn(
                    `[fetchCurrentUser] ${status} response from ${url}. ` +
                    'User is not authenticated or the session has expired.'
                );
            } else {
                console.error(
                    `[fetchCurrentUser] Unexpected ${status} error from ${url}:`,
                    error.response?.data
                );
            }
        } else {
            console.error('[fetchCurrentUser] Non-Axios error:', error);
        }

        return null;
    }
}

/**
 * Check whether the current browser session is authenticated.
 *
 * This is a lightweight wrapper around `fetchCurrentUser` that returns a
 * boolean.  It is used by the dashboard loader and the OAuth callback
 * handler to gate access to protected routes without duplicating the
 * error-handling logic.
 *
 * @returns `true` if the backend confirms the user is authenticated.
 */
export async function checkAuthStatus(): Promise<boolean> {
    const user = await fetchCurrentUser();
    return user !== null;
}

/**
 * Synchronous check using the locally cached user data in `localStorage`.
 *
 * This does NOT make a network request and therefore cannot detect an
 * expired server-side session.  Use `checkAuthStatus` for a reliable
 * server-side verification.
 *
 * @returns `true` if a user object is present in `localStorage`.
 */
export function isAuthenticated(): boolean {
    const cached = localStorage.getItem('user');
    if (!cached) return false;

    try {
        const parsed = JSON.parse(cached);
        // Ensure the stored value is a non-empty object with at least an id
        return parsed && typeof parsed === 'object' && 'id' in parsed;
    } catch {
        console.warn('[isAuthenticated] Failed to parse cached user from localStorage.');
        return false;
    }
}
