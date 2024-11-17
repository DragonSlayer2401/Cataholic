import { findUserById } from '@/controllers/userController';
import { withAuth } from '@/lib/middleware/withAuth';
import { NextResponse } from 'next/server';

export const GET = withAuth(async (req) => {
  try {
    const user = req.user;
    const foundUser = await findUserById(user.id);

    const email = foundUser?.email || null;

    if (!email) {
      return NextResponse.json({ message: 'Email not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Successfully retrieved email', email },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
});
