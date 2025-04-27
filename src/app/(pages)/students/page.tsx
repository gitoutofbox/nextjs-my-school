import { API_BASE_MONGO } from "@/config/api-config";
import { Student } from "./student.interface";
import Link from "next/link";
import DeleteStudentBtn from "./delete-student-btn";
import { imageLoader } from "@/app/lib/public-image-loader";
import Image from "next/image";
import { robotoItalic } from "@/app/lib/roboto-roboto";
import { Filters } from "./components/filters";

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
                <div className="flex-1">
                    <h1 className={`text-4xl font-bold ${robotoItalic.className}`}>Students</h1>
                    <h2 className={`text-2xl font-extralight`}>Total Records: 300</h2>
                    </div>
                <div className="justify-self-end">
                    <Link href={`students/add`} className="text-blue-500 hover:text-blue-900 float-right">+ Add Student</Link>
                </div>
            </div>
            
            <div className="overflow-x-auto">
            <Filters />
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="card">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Photo
                            </th>
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
                    <tbody className="card divide-y divide-gray-200">
                        {
                            !students || !students.length && <tr>
                                <td colSpan={7} className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-900">No records found</td>
                            </tr>
                        }
                        {
                            students && students.map((item: Student) => (
                                <tr key={item._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {
                                            item.photo ?
                                                <Image
                                                    loader={imageLoader}
                                                    src={item.photo} alt="Student Photo" width={70} height={50} />
                                                :
                                                <Image
                                                    loader={imageLoader}
                                                    src="default.jpg" alt="Student Photo" width={120} height={70} />
                                        }
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm ">{item.roll}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm ">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm ">{item.class}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm ">{item.section}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm ">{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm ">{new Date(item.updatedAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                        <Link href={`students/${item._id}`} className="force-keep-text-color text-blue-500 hover:text-blue-900 cursor-pointer mr-2">Edit</Link>
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


export function generateMetadata() {    
    return {
		title: "Student List",
		description: "Student list page",
	};
}