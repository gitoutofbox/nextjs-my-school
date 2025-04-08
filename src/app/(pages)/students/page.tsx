import { API_BASE_MONGO } from "@/config/api-config";
import { Student } from "./student.interface";
import Link from "next/link";
import DeleteStudentBtn from "./delete-student-btn";

async function fetchStudents() {
    const res = await fetch(`${API_BASE_MONGO}/student`, {
        cache: 'no-store',
        next: { revalidate: 10 }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function StudentsPage() {
    let students: Student[] = [];
    try {
        students = await fetchStudents();
    } catch {
        students = [];
    }

    return (
        <div className="flex flex-col gap-4">
            
            <div className="flex gap-2 width-full">
                <div className="flex-1"><h1 className="text-2xl font-bold">Students</h1></div>
                <div className="justify-self-end">
                    <Link href={`students/add`} className="text-blue-500 hover:text-blue-900 float-right">+ Add Student</Link>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Roll
                            </th>
                            <th scope="col" className="width-[500] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Class
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Section
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Updated At
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            !students || !students.length && <tr>
                                <td colSpan={7} className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-900">No records found</td>
                            </tr>
                        }
                        {
                            students && students.map((item: Student) => (
                                <tr key={item._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.roll}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.class}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.section}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(item.updatedAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <Link href={`students/${item._id}`} className="text-blue-500 hover:text-blue-900 cursor-pointer">Edit</Link>
                                        <DeleteStudentBtn studentId={item._id} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}