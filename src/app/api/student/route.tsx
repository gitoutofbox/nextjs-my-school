import { MONGO_CONNECTION_STRING } from "@/app/lib/db";
import { Student } from "@/app/lib/models/student";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    await mongoose.connect(MONGO_CONNECTION_STRING);
    const data = await Student.find();
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    await mongoose.connect(MONGO_CONNECTION_STRING);
    const body = await request.json();
    const student = new Student(body);
    await student.save();
    return NextResponse.json(student);
}
