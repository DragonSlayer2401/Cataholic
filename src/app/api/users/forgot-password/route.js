import { findUserByEmail, hashPassword } from '@/controllers/userController';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    // Check if a user exists by the supplied email
    const foundUser = await findUserByEmail(email.toLowerCase());

    if (!foundUser) {
      return NextResponse.json(
        { message: 'No user found with that email' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
