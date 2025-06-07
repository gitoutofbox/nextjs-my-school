'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FiltersState = {
    studentClass: string;
    studentRoll: string;
    studentSection: string;
    studentName: string;
};

export function Filters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState({
        studentClass: '',
        studentRoll: '',
        studentSection: '',
        studentName: ''
    });
    useEffect(() => {
        if (
            filters.studentName ||
            filters.studentClass ||
            filters.studentSection ||
            filters.studentRoll
        ) {
            const params = new URLSearchParams();

            if (filters.studentName) params.set('name', filters.studentName);
            if (filters.studentClass) params.set('class', filters.studentClass);
            if (filters.studentSection) params.set('section', filters.studentSection);
            if (filters.studentRoll) params.set('roll', filters.studentRoll);

            router.push(`/students?${params.toString()}`);
        } else {
            router.push(`/students`);
        }

    }, [filters.studentClass, filters.studentRoll, filters.studentSection, filters.studentName]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) {
            setFilters((prevFilters: FiltersState) => ({
                ...prevFilters,
                [field]: event.target.value
            })); 
        }
    return (
        <div className="flex gap-2 card-deeper py-4 px-6">
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="input"
                    onChange={e => handleChange(e, 'studentName')}
                />
            </div>
            <div className="flex-1">
                <input type="number" placeholder="Search by roll" className="input" onChange={e => handleChange(e, 'studentRoll')} />
            </div>
            <div className="flex-1">
                <select className="input" onChange={e => handleChange(e, 'studentClass')}>
                    <option value="">Select Class</option>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                    <option value="3">Class 3</option>
                    <option value="4">Class 4</option>
                    <option value="5">Class 5</option>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                </select>
            </div>
            <div className="flex-1">
                <select className="input"  onChange={e => handleChange(e, 'studentSection')}>
                    <option value="">Select Section</option>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                    <option value="D">Section D</option>
                    <option value="E">Section E</option>
                    <option value="F">Section F</option>
                </select>
            </div>
        </div>
    );
}