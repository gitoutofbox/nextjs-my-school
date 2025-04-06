import { MONGO_CONNECTION_STRING } from "@/app/lib/db";
import { Product } from "@/app/lib/models/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    console.log(MONGO_CONNECTION_STRING)
    await mongoose.connect(MONGO_CONNECTION_STRING);
    const data = await Product.find();
    return NextResponse.json(data)
}