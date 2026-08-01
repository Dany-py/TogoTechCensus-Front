import type { Technologies as TechType } from "../../types/Project"  // ← Renommage du type
import { useState, useEffect } from "react";
import slugify from "slugify"
import axios from 'axios'

interface TypesProps {
    value: string,
    onChange: (value: string) => void
}

interface TechnoArrayProps {
    code: string,
    name: string
}

const Technologies = ({ value, onChange }: TypesProps) => {
    const [techno, setTechno] = useState<Array<TechnoArrayProps>>([]);  // ← Suppression de la variable externe

    useEffect(() => {
        const fetchTechno = async () => {
            const url = import.meta.env.VITE_API_TECHNO as string
            const response = await axios.get(url)
            
            const technos = response.data.map((tech: TechType) => ({  // ← Variable locale + type renommé
                code: slugify(tech.name, { replacement: '-', remove: /[*+~.()'"!:@]/g, lower: true, strict: false, locale: 'en', trim: true }),
                name: tech.name
            }))
            
            setTechno(technos)
        }
        fetchTechno()
    }, [])

    return (
        <div>
            <select
                id="type"
                name="technologies"
                required
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="form-select form-control mt-0.5"
            >
                <option value="">Technologies...</option>
                {techno.map((tech) => (
                    <option style={{ background: 'transparent' }} key={tech.code} value={tech.code}>
                        {tech.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Technologies;