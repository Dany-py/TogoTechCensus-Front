
import React from "react";

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement>{
    style?: React.CSSProperties;
    label: string,
    href: string
}