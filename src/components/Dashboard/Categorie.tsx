
import { useState } from "react"

const categories = [
    { code: 'fintech-financial', name: 'FinTech & Financial Services' },
    { code: 'health-healthtech', name: 'Health & HealthTech' },
    { code: 'logistics-transport', name: 'Logistics & Transport' },
    { code: 'agritech', name: 'AgriTech' },
    { code: 'edtech-training', name: 'EdTech & Training' },
    { code: 'b2b-services', name: 'B2B Services' },
    { code: 'marketplace-e-commerce', name: 'Marketplace & E-commerce' },
    { code: 'social-impact-greentech', name: 'Social Impact & GreenTech' },
    { code: 'events-culture', name: 'Events & Culture' },
    { code: 'employment-hr', name: 'Employment and HR ' },
    { code: 'gaming', name: 'Gaming' },
    { code: 'devsecops-security', name: 'DevSecOps & Security' },
    { code: 'mobile-apps', name: 'Mobile Apps' },
    { code: 'web-developpement', name: 'Web Development' },
    { code: 'artificial-intelligence', name: 'Artificial Intelligence' },
    { code: 'sdk-cli-libraries', name: 'SDK, CLI & Libraries' },
    { code: 'api-microservices', name: 'APIs & Microservices' },
    { code: 'community-learning', name: 'Community & Learning' },
    { code: 'mathematics-science', name: 'Mathematics & Science' },
    { code: 'ressources-documentation', name: 'Resources & Documentation' },
    { code: 'hubs-incubators-communities', name: 'Hubs, Incubators & Communities' },
]

const Categories = () => {
    const [selected, setSelected] = useState<string>("");
    return (
        <div>
            <select
            id="categorie"
            name = "categorie"
            required
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className = "form-select form-control mt-0.5"
            >
            <option value="">Categorie...</option>
            {categories.map((categorie) => (
                <option style = {{
                background: 'transparent',
                }}
                key={categorie.code} value={categorie.code}>
                {categorie.name}
                </option>
            ))}
            </select>

        </div>
    );
}

export default Categories;