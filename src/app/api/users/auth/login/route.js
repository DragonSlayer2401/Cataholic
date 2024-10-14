import {
  findUserByUsername,
  generateJWT,
  verifyPassword,
} from '@/controllers/userController';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { username, password } = body;
  const foundUser = await findUserByUsername(username.toLowerCase());

  if (!foundUser) {
    return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
  }

  const success = await verifyPassword(password, foundUser.password);

  if (success) {
    const jwt = generateJWT({
      id: foundUser._id,
      username: foundUser.username,
    });

    if (jwt) {
      return NextResponse.json(
        { message: 'Login Successful', token: jwt },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: 'Login Failed' }, { status: 500 });
  }

  return NextResponse.json(
    { message: 'Invalid credentials' },
    { status: 401 }
  );
}
