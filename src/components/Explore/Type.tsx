
const types = [
    { code: 'STP', name: 'Startup' },
    { code: 'OS', name: 'Open Source'},
    { code: 'ENT', name: 'Enterprise' },
    { code: 'ACC', name: 'Accelerator' },
    { code: 'ONG', name: 'Organisation' },
    { code: 'COM', name: 'Community' },
    { code: 'HUB', name: 'Hub' },
    { code: 'INC', name: 'Incubator' }
]

interface TypesProps {
    value: string,
    onChange: (value: string) => void
}

const Types = ({ value, onChange }: TypesProps) => {
  //const [selected, setSelected] = useState<string>("");

    return (
        <div>
            <select
            id="type"
            name = "type"
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className = "form-select form-control mt-0.5"
            >
            <option value="">Type...</option>
            {types.map((type) => (
                <option 
                key={type.code} 
                value={type.name}
                >
                {type.name}
                </option>
            ))}
            </select>

        </div>
    );
}

export default Types;