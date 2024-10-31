import { deleteUser } from '@/controllers/userController';
import { withAuth } from '@/lib/middleware/withAuth';
import { NextResponse } from 'next/server';

export const DELETE = withAuth(async (req) => {
  try {
    const user = req.user;
    const deletedUser = await deleteUser(user.id);

    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Successfully deleted user' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
});
