
import type { CardProps } from "../../types/Card"
import type {FC} from 'react';
import '../../styles/Components.ui.css'
const Card: FC<CardProps>= ({ style, children }) => {
    return <>
        <div className="Card"
            style={{
                ...style
            }}>
            {
                ...children
            }
        </div>
    </>
}

export default Card