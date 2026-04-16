import { useEffect, useRef, useState } from 'react';
import { apiClient } from '../services/csrf.service';

interface UseDetailInterceptorProps {
    projectId: string | number;
}

/**
 * Projects views count hook
 * Start counting after 5 secondes of visibility
 */
const useDetailInterceptor = ({ projectId }: UseDetailInterceptorProps) => {
    const projectRef = useRef<HTMLDivElement>(null);
    const [viewCounted, setViewCounted] = useState(false);

    useEffect(() => {
        let timer: number;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !viewCounted) {
                    timer = setTimeout(() => {
                        countView();
                    }, 5000)
                } else {
                    clearTimeout(timer)
                }
            },
            { threshold: 0.5 }
        )

        if (projectRef.current) {
            observer.observe(projectRef.current);
        }

        return () => {
            if (projectRef.current) observer.unobserve(projectRef.current)
            clearTimeout(timer)
        }
    }, [viewCounted, projectId]);

    const countView = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_PROJECT as string
            const url = `${apiUrl}stats/${projectId}`
            await apiClient.patch(url)
            setViewCounted(true);
            //console.log("Vue comptabilisée pour le projet :", projectId);
        } catch (err) {
            console.error("Erreur lors du comptage de la vue", err)
        }
    }

    return { projectRef };
}

export default useDetailInterceptor;
