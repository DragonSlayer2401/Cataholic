import {
  findUserByEmail,
  generateJWT,
  verifyPassword,
} from '@/controllers/userController';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  try {
    const foundUser = await findUserByEmail(email.toLowerCase());

    if (!foundUser) {
      return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
    }

    const success = await verifyPassword(password, foundUser.password);
    if (success) {
      const jwt = generateJWT({
        id: foundUser._id,
        email: foundUser.email,
      });

      return NextResponse.json(
        { message: 'Login Successful', token: jwt },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
