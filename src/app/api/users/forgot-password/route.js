import {
  findUserByEmail,
  generateJWT,
  sendResetEmail,
} from '@/controllers/userController';
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

    // Generate a reset token
    const resetToken = generateJWT(
      {
        id: foundUser._id,
        email: foundUser.email,
      },
      '5m'
    );

    // Create reset link
    const resetLink = `${process.env.BASE_URL}/forgot-password?token=${resetToken}`;

    // Send email with reset link
    const success = await sendResetEmail(email, resetLink);

    if (success) {
      return NextResponse.json(
        { message: 'Email sent successfully' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
