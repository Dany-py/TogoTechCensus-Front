
import type { ButtonProps } from "../../types/Button";
import type { FC } from 'react';

const Button: FC<ButtonProps> = ({ style, label, onClick }) => {
    return <>
        <button 
            style={{
                backgroundColor:'#52B878',
                color: '#ffff',
                ...style
            }}
            onClick={onClick}>{label}
        </button>;
    </>
};

export default Button