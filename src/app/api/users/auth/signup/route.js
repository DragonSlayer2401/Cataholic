import {
  createUser,
  findUserByUsername,
  hashPassword,
} from '@/controllers/userController';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { username, password } = body;
  // Check if a user already exists by the supplied username
  const foundUser = await findUserByUsername(username);

  if (!foundUser) {
    const hashedPassword = await hashPassword(password);
    const createdUser = await createUser({
      username,
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

  // Username is already taken
  return NextResponse.json({ message: 'Username is taken' }, { status: 409 });
}
