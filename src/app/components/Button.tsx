'use client';

import { twMerge } from "tailwind-merge";

export default function Button({ children, className, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const defaultClassName = "bg-blue-500 text-white py-1 px-2 rounded cursor-pointer";
    const combinedClassName = twMerge(defaultClassName, className || "");
    console.log(combinedClassName);
    return (
        <button
            className={combinedClassName}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}