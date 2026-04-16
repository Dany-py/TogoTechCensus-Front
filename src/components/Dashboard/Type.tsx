
import { useState } from "react"

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

const Types = () => {
  const [selected, setSelected] = useState<string>("");

    return (
        <div>
            <span className='required-sign mx-2 p-0'>*</span><span>Type</span>
            <select
            id="type"
            name = "type"
            required
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            style={{
                backgroundColor: '#f4fefe',
            }}
            className = "form-select mt-0.5"
            >
            <option value="">--</option>
            {types.map((type) => (
                <option style = {{
                background: 'transparent',
                }}
                key={type.code} value={type.name}>
                {type.name}
                </option>
            ))}
            </select>

        </div>
    );
}

export default Types;