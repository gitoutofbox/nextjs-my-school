'use client';

import { robotoItalic } from "@/app/lib/roboto-roboto";
import { API_BASE_MONGO } from "@/config/api-config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

export default function AddStudent() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: FieldValues) => {
        console.log(data);
        fetch(`${API_BASE_MONGO}/student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    // alert("Student added successfully");
                    router.push("/students");
                } else {
                    alert("Error adding student");
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Error adding student");
            });
    };
    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-6 text-center">Add Student</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row gap-4">
                    <div className="flex-1 card border rounded-md p-4 mb-4">
                        <h2 className={`text-2xl mb-6 ${robotoItalic.className}`}>Student Personal Details</h2>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium">
                                Photo
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("photo", { required: true })}
                                id="photo"
                               
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {process.env.NODE_ENV !== 'development' && (
                                <div className="text-orange-300">Vercel does not provide permission to upload files</div>
                            )}
                            {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium">
                                Name
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                id="name"
                                name="name"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter student name"
                            />
                            {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                id="email"
                                name="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter student email"
                            />
                            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium">
                                Phone
                            </label>
                            <input
                                type="tel"
                                {...register("phone", { required: false })}
                                id="phone"
                                name="phone"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter student phone"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-medium">
                                Address
                            </label>
                            <textarea
                                id="address"
                                {...register("address", { required: false })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter student address"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dob" className="block text-sm font-medium">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                {...register("dob", { required: true })}
                                id="dob"
                                name="dob"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.dob && <span className="text-red-500 text-sm">Date of Birth is required</span>}
                        </div>
                    </div>

                    <div className="flex-1 card border rounded-md p-4 mb-4">
                        <h2 className={`text-2xl mb-6 ${robotoItalic.className}`}>Student School Details</h2>
                        <div className="mb-4">
                            <label htmlFor="class" className="block text-sm font-medium">
                                Class
                            </label>
                            <input
                                type="text"
                                {...register("class", { required: true })}
                                id="class"
                                name="class"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter student class"
                            />
                            {errors.class && <span className="text-red-500 text-sm">Class is required</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="class" className="block text-sm font-medium">
                                Section
                            </label>
                            <input
                                type="text"
                                {...register("section", { required: true })}
                                id="class"
                                name="section"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter student section"
                            />
                            {errors.section && <span className="text-red-500 text-sm">Section is required</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="roll" className="block text-sm font-medium">
                                Roll
                            </label>
                            <input
                                type="text"
                                {...register("roll", { required: true })}
                                id="roll"
                                name="roll"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter student roll number"
                            />
                            {errors.roll && <span className="text-red-500 text-sm">Roll number is required</span>}
                        </div>
                    </div>

                </div>
                <div className="mb-4 flex justify-end space-x-4">
                    <Link href="/students" className="text-blue-500 hover:text-blue-900 py-2 px-4 border border-blue-500 rounded-md text-center">
                        Back
                    </Link>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}