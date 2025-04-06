"use client";
import { useEffect, useState } from "react";

export default function Category() {
    interface Category {
        id: number;
        title: string;
    }

    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }
    , []);
    return (
        <main className="flex min-h-screen flex-col p-6">
            <div>
                <h1 className="text-2xl font-bold">Categories</h1>
                <ul className="list-disc pl-5">
                    {categories.map((category) => (
                        <li key={category.id} className="my-2">
                            {category.title}
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}