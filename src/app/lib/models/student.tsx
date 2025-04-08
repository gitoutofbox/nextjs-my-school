import mongoose from "mongoose";

const studentModel = new mongoose.Schema({
    studentId: Number,
    name: String,
    email: String,
    photo: String,
    dob: Date,
    phone: String,
    address: String,
    class: Number,
    section: String,
    roll: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export const Student = mongoose.models.student_details || mongoose.model('student_details', studentModel);