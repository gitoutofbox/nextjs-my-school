import { MONGO_CONNECTION_STRING } from "@/app/lib/db";
import { Student } from "@/app/lib/models/student";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

type StudentRequestBody = {
    type: 'GET' | 'CREATE';
    studentClass?: string | number;
    studentRoll?: string | number;
    studentSection?: string;
    studentName?: string;
    [key: string]: unknown;
};

async function getStudents(body: StudentRequestBody) {
    const {studentClass, studentRoll, studentSection, studentName} = body;
    const filter: Record<string, unknown> = {};
    
    if (studentClass) filter.class = Number(studentClass);
    if (studentRoll) filter.roll = studentRoll;
    if (studentSection) filter.section = studentSection;
    if (studentName) filter.name = { $regex: studentName, $options: "i" };
    // if (studentName) filter.name = { $regex: '.*' + studentName + '.*'};
    console.log('AAAAAAAAAAAAAA', filter)

    await mongoose.connect(MONGO_CONNECTION_STRING);
    const data = await Student.find(filter);
    
    return NextResponse.json(data);
}

async function createStudent(body: StudentRequestBody) {
    await mongoose.connect(MONGO_CONNECTION_STRING);
    const student = new Student(body);
    await student.save();
    return NextResponse.json(student);
}

export async function POST(request: Request) {
    const body = await request.json();

    if (body.type === 'GET') {
        return getStudents(body);
    } else if (body.type === 'CREATE') {
        return createStudent(body);
    }
}
