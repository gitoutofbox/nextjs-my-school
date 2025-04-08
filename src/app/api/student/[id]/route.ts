import { MONGO_CONNECTION_STRING } from "@/app/lib/db";
import { Student } from "@/app/lib/models/student";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    await mongoose.connect(MONGO_CONNECTION_STRING);
    const {id} = await params; 
    const student = await Student.findById(id);
    if (!student) {
        return NextResponse.json({message: "Student not found"}, {status: 404});
    }
    return NextResponse.json(student); 
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    await mongoose.connect(MONGO_CONNECTION_STRING);
    const {id} = await params;
    const student = await Student.findByIdAndDelete(id);
    
    if (!student) {
        return NextResponse.json({message: "Student not found"}, {status: 404});
    }
    return NextResponse.json({message: "Student deleted successfully"});
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    await mongoose.connect(MONGO_CONNECTION_STRING);
    const {id} = await params;
    const body = await request.json();
    const student = await Student.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!student) {
        return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Student updated successfully", student });
}

