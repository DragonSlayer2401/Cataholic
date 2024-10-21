import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function GET(req) {
  try {
    const cookie = serialize('token', '', {
      httpOnly: true, // Makes the cookie only accessible by the server
      secure: process.env.NODE_ENV === 'production', // Makes the cookie only available over HTTPS in production
      sameSite: 'strict', // Makes the cookie only available for the same site
      maxAge: 0, // Sets the cookie to expire in 7 days
      path: '/', // Makes the cookie available to all routes
    });

    const response = NextResponse.json(
      { message: 'Logout Successful' },
      { status: 200 }
    );

    response.headers.set('Set-Cookie', cookie);

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
