
import '../../styles/Components.ui.css';

interface SpinnerProps{
    color?: string;
    size?: 'small' | 'medium' | 'large'
}

function Spinner({color, size}: SpinnerProps) {
    return <div className = {`spinner spinner-size--${size}`} style= {{borderTopColor: color}} />
}

export default Spinner