import { MONGO_CONNECTION_STRING } from "@/app/lib/db";
import { Student } from "@/app/lib/models/student";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    await mongoose.connect(MONGO_CONNECTION_STRING);
    const { id } = await params;
    const student = await Student.findById(id);
    if (!student) {
        return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }
    return NextResponse.json(student);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    await mongoose.connect(MONGO_CONNECTION_STRING);
    const { id } = await params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
        return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Student deleted successfully" });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    await mongoose.connect(MONGO_CONNECTION_STRING);
    const { id } = await params;
    // const body = await request.json();
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const dob = formData.get("dob");
    const className = formData.get("class");
    const section = formData.get("section");
    const roll = formData.get("roll");
    const age = formData.get("age");
    const address = formData.get("address");

    let studentPhoto = '';
    const photo = formData.get("photo");
    if(photo) {
       
        if (photo instanceof File) {
            const uuid = uuidv4();
            const photoByte = await photo.arrayBuffer();
            const photoBuffer = Buffer.from(photoByte);
            const newPhotoName = `${uuid}_${photo.name}`;
            const photoPath = `public/student-photos/${newPhotoName}`;
            await writeFile(photoPath, photoBuffer);
            studentPhoto =  newPhotoName;
    } 
    else {
        studentPhoto = formData.get("photo") as string;
        // throw new Error("Invalid photo format");
    }
    
    } 

    const studentPayload= {
        photo: studentPhoto,
        name,
        email,
        phone,
        dob,
        class: className,
        section,
        roll,
        age,
        address,
    };
    


    const student = await Student.findByIdAndUpdate(id, studentPayload, { new: true, runValidators: true });

    if (!student) {
        return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Student updated successfully", student }, { status: 201 });
}

