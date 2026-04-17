import { redirect } from 'react-router-dom';
import { AxiosError } from 'axios';
import { apiClient, getCookie } from './csrf.service';
import { isAuthenticated } from './user.service';

export const dashboardLoader = async () => {
    const url = import.meta.env.VITE_API_USER as string;

    if (!url) {
        console.error('[dashboardLoader] VITE_API_USER is not defined in .env');
        return redirect('/signin/?message=' + encodeURIComponent('Configuration error. Please contact support.'));
    }

    // Fast-path: check for a Django session cookie before hitting the API.
    // The sessionid cookie is HttpOnly so we cannot read its value, but we
    // can still verify that the user has been authenticated via the lightweight
    // isAuthenticated helper which reads from localStorage.
    const sessionCookie = getCookie('sessionid');
    const cachedUser = localStorage.getItem('user');

    if (!sessionCookie && !cachedUser) {
        console.warn('[dashboardLoader] No session cookie or cached user found. Redirecting to login.');
        return redirect('/signin/?message=' + encodeURIComponent('Veuillez vous connecter pour accéder au tableau de bord.'));
    }

    // Secondary check: verify the cached user data is still valid (synchronous localStorage read)
    const authenticated = isAuthenticated();
    if (!authenticated) {
        console.warn('[dashboardLoader] isAuthenticated() returned false. Redirecting to login.');
        localStorage.removeItem('user');
        return redirect('/signin/?message=' + encodeURIComponent('Votre session a expiré. Veuillez vous reconnecter.'));
    }

    try {
        console.log('[dashboardLoader] Fetching user data from', url);
        const response = await apiClient.get(url);

        if (!response.data) {
            throw new Error('Empty response from /api/users/me/');
        }

        const userData = response.data;
        console.log('[dashboardLoader] User data received:', userData);
        localStorage.setItem('user', JSON.stringify(userData));

        return null;

    } catch (error) {
        if (error instanceof AxiosError) {
            const status = error.response?.status;
            const detail = error.response?.data;

            if (status === 401 || status === 403) {
                console.error(
                    `[dashboardLoader] ${status} error fetching user data.`,
                    'Session may be missing or expired.',
                    { url, detail }
                );
                localStorage.removeItem('user');
                // The apiClient response interceptor will also redirect, but we
                // return here explicitly so the loader resolves cleanly.
                return redirect('/signin/?message=' + encodeURIComponent('Votre session a expiré. Veuillez vous reconnecter.'));
            }

            console.error('[dashboardLoader] Unexpected API error:', status, detail);
        } else {
            console.error('[dashboardLoader] Non-Axios error:', error);
        }

        localStorage.removeItem('user');
        return redirect('/signin/?message=' + encodeURIComponent('Une erreur est survenue. Veuillez vous reconnecter.'));
    }
};