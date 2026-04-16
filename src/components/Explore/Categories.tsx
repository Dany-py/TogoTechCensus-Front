import { useState, useEffect } from "react";
import slugify from "slugify"
import axios from 'axios'

interface CategorieProps {
    value: string,
    onChange: (value: string) => void
}

interface CategoryArrayProps {
    code: string,
    name: string
}

const Categories = ({ value, onChange }: CategorieProps) => {
    const [categories, setCategories] = useState<Array<CategoryArrayProps>>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const url = import.meta.env.VITE_API_CATEGORY as string
            const response = await axios.get(url)

            const cats = response.data.map((cat: { name: string }) => ({
                code: slugify(cat.name, { replacement: '-', remove: /[*+~.()'"!:@]/g, lower: true, strict: false, locale: 'en', trim: true }),
                name: cat.name
            }))

            setCategories(cats)
        }
        fetchCategories()
    }, [])

    return (
        <div>
            <select
                id="categorie"
                name="categorie"
                required
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="form-select form-control mt-0.5"
            >
                <option value="">Categorie...</option>
                {categories.map((categorie) => (
                    <option style={{ background: 'transparent' }} key={categorie.code} value={categorie.code}>
                        {categorie.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Categories;