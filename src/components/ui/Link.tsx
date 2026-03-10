
import type { LinkProps } from "../../types/Link";
import '../../styles/Components.ui.css'
import type { FC } from 'react'

const Link: FC<LinkProps> = ({style, label, href}) => {
    return <>
        <a href= {href} style={{...style}} className="link">
            {label}
        </a>
    </>
}

export default Link