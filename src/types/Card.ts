

import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>{
    style?: React.CSSProperties;
    children?: any
}