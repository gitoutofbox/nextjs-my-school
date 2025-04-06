"use client"

import Link from "next/link";
import { useState } from "react";

interface SingleProductProps {
    id: number
    title: string;
    idx: number
}

export default function SingleProduct({ id, title, idx }: SingleProductProps) {
    const [textColor, setTextColor] = useState({ color: 'blue' });
    function showDetails() {
        alert(`Product details for ${title}`);
    }
    return (
        <div className="p-4 border-b">
            <h2 className="text-xl font-bold" style={textColor} onClick={() => setTextColor({ color: 'red' })}>
                <Link href={`/product/${id.toString()}`} onClick={showDetails}>
                {textColor.color} - {idx + 1}: {title}
                </Link>
            </h2>
        </div>
    )
}

export function generateMetadata() {
    return {
        title: "Products",
        description: "Products page",
    };
}

// export function generateStaticParams() {
//     const params = [];
//     for (let i = 1; i <= 10; i++) {
//         params.push({ productId: i.toString() });
//     }
//     return params;
// }