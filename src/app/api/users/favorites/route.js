import { findUserById } from '@/controllers/userController';
import { withAuth } from '@/lib/middleware/withAuth';
import { NextResponse } from 'next/server';

export const GET = withAuth(async (req) => {
  try {
    const user = req.user;
    const foundUser = await findUserById(user.id);

    const favorites = foundUser?.favorites || [];

    return NextResponse.json(
      { message: 'Successfully retrieved favorites', favorites },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
});
