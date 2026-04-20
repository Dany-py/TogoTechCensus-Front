
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
  const value = `; ${document.cookie}`;
  console.log('Cookies du navigateur :', value)
  const parts = value.split(`; ${name}=`);
  console.log('Cookie splited :', parts)
  if (parts.length === 2) {
    const returnCookie = parts.pop()?.split(';').shift()
    console.log('Cookie value to return :', returnCookie)
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