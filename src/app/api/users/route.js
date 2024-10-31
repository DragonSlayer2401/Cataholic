import { findUserById } from '@/controllers/userController';
import { withAuth } from '@/lib/middleware/withAuth';
import { NextResponse } from 'next/server';

export const GET = withAuth(async (req) => {
  const user = req.user;
  const foundUser = await findUserById(user.id);

  const email = foundUser?.email || '';

  return NextResponse.json(
    { message: 'Successfully retrieved email', email },
    { status: 200 }
  );
});
