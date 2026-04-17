import { redirect } from 'react-router-dom';
import { apiClient } from './csrf.service';

export const dashboardLoader = async () => {
    const url = import.meta.env.VITE_API_USER;
    
    try {
        const response = await apiClient.get(url);
        
        // Vérifiez si la donnée existe réellement avant de stocker
        if (!response.data) {
            throw new Error("No user data");
        }

        const userData = response.data;
        localStorage.setItem('user', JSON.stringify(userData));
        
    } catch (error) {
        console.error('Loader Error:', error);
        localStorage.removeItem('user');
        
        return redirect("/SignUp?message=" + encodeURIComponent("Votre session a expiré. Veuillez vous reconnecter."));
    }
};