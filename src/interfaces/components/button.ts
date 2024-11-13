import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonProps = {
    children: ReactNode;
    className?: string;
    disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;