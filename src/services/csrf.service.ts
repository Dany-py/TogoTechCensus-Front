
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
    console.log('Document cookie :', document.cookie)
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    console.log('Cookie :', match)
    return match ? match[2] : '';
}

export async function initCSRF() {
    const url = import.meta.env.VITE_API_CSRF as string;
    const response = await apiClient.get(url);
    const token = response.data.csrfToken; // ← token dans le body
    
    // Stocker dans axios pour toutes les requêtes suivantes
    apiClient.defaults.headers.common['X-CSRFToken'] = token;
    return token;
}