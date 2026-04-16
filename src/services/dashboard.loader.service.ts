
import { redirect } from 'react-router-dom';
import { apiClient } from './csrf.service'

export const dashboardLoader = async () => {
    const url = import.meta.env.VITE_API_USER
    try {
        const response = await apiClient.get(url)
        const user = JSON.stringify(response.data)
        localStorage.setItem('user', user)
        if (!user) {
            return redirect("/SignUp?message= Votre session a expiré. Veuillez vous reconnecter.")
        }
    } catch (error) {
        console.log('Error :', error)
        return redirect("/SignUp?message= Votre session a expiré. Veuillez vous reconnecter.")
    }
}
