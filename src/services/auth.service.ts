
import type { ActionFunctionArgs } from 'react-router-dom';
import { checkAuthStatus } from './user.service';

/**
 * Action handler for the Sign In / Sign Up forms.
 *
 * For OAuth2 providers (Google, GitHub) we redirect the browser to the
 * Django social-auth endpoint.  Django handles the OAuth2 dance and, on
 * success, sets a `sessionid` HttpOnly cookie before redirecting back to
 * the frontend at the path configured in SOCIAL_AUTH_LOGIN_REDIRECT_URL
 * (typically `/dashboard/`).
 *
 * The `handleOAuthCallback` function below is called by the dashboard
 * loader to verify that the session was actually established after the
 * redirect lands.
 */
export async function userAuth(args: ActionFunctionArgs) {
    try {
        const clonedRequest = args.request.clone();
        const formData = await clonedRequest.formData();
        const intent = formData.get("intent");

        if (intent === 'google') {
            const url = import.meta.env.VITE_AUTH_GOOGLE as string;
            if (!url) {
                console.error('[userAuth] VITE_AUTH_GOOGLE is not defined in .env');
                return null;
            }
            console.log('[userAuth] Redirecting to Google OAuth2:', url);
            window.location.href = url;
        } else if (intent === 'github') {
            const url = import.meta.env.VITE_AUTH_GITHUB as string;
            if (!url) {
                console.error('[userAuth] VITE_AUTH_GITHUB is not defined in .env');
                return null;
            }
            console.log('[userAuth] Redirecting to GitHub OAuth2:', url);
            window.location.href = url;
        }
    } catch (error) {
        console.error('[userAuth] Unexpected error during OAuth2 redirect:', error);
    }

    return null;
}

/**
 * Called after the OAuth2 provider redirects back to the frontend.
 *
 * Django social-auth sets the `sessionid` cookie before the redirect, so
 * by the time this function runs the cookie should already be present.
 * We verify this by hitting the `/api/users/me/` endpoint and return
 * whether the user is now authenticated.
 *
 * @returns `true` if the session is valid, `false` otherwise.
 */
export async function handleOAuthCallback(): Promise<boolean> {
    console.log('[handleOAuthCallback] Verifying session after OAuth2 callback…');

    const authenticated = await checkAuthStatus();

    if (authenticated) {
        console.log('[handleOAuthCallback] Session established successfully.');
    } else {
        console.warn(
            '[handleOAuthCallback] Session could not be verified. ' +
            'The sessionid cookie may be missing or the backend rejected the request.'
        );
    }

    return authenticated;
}