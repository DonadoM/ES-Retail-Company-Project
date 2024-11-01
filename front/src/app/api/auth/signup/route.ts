import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(request: Request) {
  const { fullname, email, password } = await request.json();
  console.log(fullname, email, password);

  if (!password || password.length < 8)
    return NextResponse.json(
      { message: "La contraseña debe tener al menos 8 caracteres" },
      { status: 400 }
    );

  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound)
      return NextResponse.json(
        { message: "El correo ya esta registrado" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      fullname,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    console.log(savedUser);

    return NextResponse.json(savedUser);
  } catch (error) {
    console.error(error);
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.error();
  }
}
