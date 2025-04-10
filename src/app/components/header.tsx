'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="flex justify-between items-center p-4 bg-gray-600 text-white">
            <div className="text-lg font-bold">School Management System</div>
            <nav>
                <ul className="flex space-x-4">
                    <li className={pathname === '/' ? 'text-gray-200 font-bold' : ''}>Home</li>
                    <li className={pathname.includes('/students') ? 'text-gray-200 font-bold' : ''}>
                        <Link href={'/students'}>Students</Link>
                    </li>
                    <li>Teachers</li>
                    <li>Sections</li>
                </ul>
            </nav>
        </header>
    );
}