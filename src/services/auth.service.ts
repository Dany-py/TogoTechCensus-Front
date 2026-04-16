
//import axios from 'axios'
import axios from 'axios';
import type { ActionFunctionArgs } from 'react-router-dom';

axios.defaults.withCredentials = true;

axios.defaults.xsrfCookieName = 'csrftoken';

axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export async function userAuth(args: ActionFunctionArgs) {
    try {
        const clonedRequest = args.request.clone();
        const formData = await clonedRequest.formData();
        const intent = formData.get("intent");
        
        if(intent === 'google') {
            const url = import.meta.env.VITE_AUTH_GOOGLE
            window.location.href = url
        } else if (intent === 'github') {
            const url = import.meta.env.VITE_AUTH_GITHUB
            window.location.href = url
        }
    } catch (error) {
        console.log('Error :', error)
    }
}