import {
  findUserByEmail,
  generateJWT,
  verifyPassword,
} from '@/controllers/userController';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;
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

      const cookie = serialize('token', jwt, {
        httpOnly: true, // Makes the cookie only accessible by the server
        secure: process.env.NODE_ENV === 'production', // Makes the cookie only available over HTTPS in production
        sameSite: 'strict', // Makes the cookie only available for the same site
        maxAge: 60 * 60 * 24 * 7, // Sets the cookie to expire in 7 days
        path: '/', // Makes the cookie available to all routes
      })

      const response = NextResponse.json(
        { message: 'Login Successful' },
        { status: 200 }
      );

      response.headers.set('Set-Cookie', cookie);

      return response;
    }

    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
