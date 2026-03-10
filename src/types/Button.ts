
import React from "react";


export interface ButtonProps {
    style?: React.CSSProperties,
    label: string;
    onClick?: () => void;
}