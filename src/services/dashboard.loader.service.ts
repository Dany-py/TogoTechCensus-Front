import { redirect } from 'react-router-dom';
import { apiClient } from './csrf.service';

export const dashboardLoader = async () => {
    const url = import.meta.env.VITE_API_USER;
    
    try {
        const response = await apiClient.get(url);
        console.log('Response user.me :', response)
        
        // Vérifiez si la donnée existe réellement avant de stocker
        if (!response.data) {
            console.log('Response fetch user data :', response.data)
            throw new Error("No user data");
        }

        const userData = response.data;
        console.log('User data :', userData)
        localStorage.setItem('user', JSON.stringify(userData));
        return response.data
        
    } catch (error) {
        console.error('Loader Error:', error);
        localStorage.removeItem('user');
        
        return redirect("/SignUp?message=" + encodeURIComponent("Votre session a expiré. Veuillez vous reconnecter."));
    }
};