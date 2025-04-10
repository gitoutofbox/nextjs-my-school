'use client';

import { API_BASE_MONGO } from "@/config/api-config";
import { ParamValue } from "next/dist/server/request/params";
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { robotoItalic } from "@/app/lib/roboto-roboto";
import Image from 'next/image'
import { imageLoader } from "@/app/lib/public-image-loader";

export default function EditStudent() {

    const photoRef = useRef<HTMLLabelElement>(null);
    const params = useParams();
    const router = useRouter();

    const id = params.id;
    function uploadImage() {
        photoRef.current?.click();
    }
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();


    useEffect(() => {
        async function fetchStudent(id: ParamValue) {
            const resp = await fetch(`${API_BASE_MONGO}/student/${id}`);
            const data = await resp.json();
            if (resp.ok) {
                data.dob = new Date(data.dob).toISOString().split('T')[0]; // Format date to YYYY-MM-DD
                // console.log(data)
                reset(data);
                console.log(getValues())
            }
        }
        fetchStudent(id);
    }, [id]);



    const onSubmit = (data: FieldValues) => {
        data.photo = data.photo[0];
        const formData = new FormData();
        formData.set("photo", data.photo);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("address", data.address);
        formData.append("dob", data.dob);
        formData.append("class", data.class);
        formData.append("section", data.section);
        formData.append("roll", data.roll);

        fetch(`${API_BASE_MONGO}/student/${id}`, {
            method: 'PUT',
            headers: {
                // 'Content-Type': 'multipart/form-data',
            },
            // body: JSON.stringify(data),
            body: formData,
            // body: JSON.stringify(formData),
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
            <h1 className={`text-4xl mb-6 ${robotoItalic.className}`}>Update Student</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-4">
                    <div className="flex-1 card border rounded-md p-4 mb-4">
                        <div className="flex">
                            <h2 className={`text-2xl mb-6 ${robotoItalic.className}`}>Student Personal Details</h2>
                            <div className="justify-end flex-1 flex items-center cursor-pointer" onClick={uploadImage}>
                                {
                                    getValues('photo') ?
                                        <Image
                                            loader={imageLoader}
                                            src={getValues('photo')} alt="Student Photo" width={120} height={70} />
                                        :
                                        <Image
                                            loader={imageLoader}
                                            src="default.jpg" alt="Student Photo" width={120} height={70} />
                                }
                                <div>
                                    {errors.photo && <span className="text-red-500 text-sm">This field is required</span>}
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="photo" className="block text-sm font-medium" ref={photoRef}>
                                Photo
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("photo", { required: false })}
                                id="photo"
                                name="photo"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.photo && <span className="text-red-500 text-sm">This field is required</span>}
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