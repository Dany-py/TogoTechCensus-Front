
import axios from "axios";

export const apiClient = axios.create({
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
})

apiClient.interceptors.request.use((config) => {
  const csrfToken = getCookie('csrftoken');
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }else {
    console.log('Token not found :', csrfToken)
  }
  return config;
});

export function getCookie(name: string): string {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : '';
}

export async function initCSRF() {
    const url = import.meta.env.VITE_API_CSRF as string;
    const response = await apiClient.get(url);
    return response.data;
}