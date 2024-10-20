import {
  createUser,
  findUserByEmail,
  hashPassword,
} from '@/controllers/userController';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;
   // Check if a user already exists by the supplied email
  const foundUser = await findUserByEmail(email.toLowerCase());

  if (!foundUser) {
    const hashedPassword = await hashPassword(password);
    const createdUser = await createUser({
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    if (createdUser) {
      return NextResponse.json(
        { message: 'User created successfully' },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to create user' },
      { status: 500 }
    );
  }

  // Email is already taken
  return NextResponse.json({ message: 'email is already in use' }, { status: 409 });
}
