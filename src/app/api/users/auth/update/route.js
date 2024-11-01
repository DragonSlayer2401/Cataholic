import {
  findUserById,
  hashPassword,
  updateUser,
  verifyPassword,
} from '@/controllers/userController';
import { withAuth } from '@/lib/middleware/withAuth';
import { NextResponse } from 'next/server';

export const PUT = withAuth(async (req) => {
  try {
    const user = req.user;
    const body = await req.json();
    const { email, currentPassword, newPassword } = body;
    let hashedPassword;

    if (currentPassword && newPassword) {
      const foundUser = await findUserById(user.id);
      const success = await verifyPassword(currentPassword, foundUser.password);

      if (!success) {
        return NextResponse.json(
          { message: 'Invalid password' },
          { status: 401 }
        );
      }

      hashedPassword = await hashPassword(newPassword);
    }

    const updatedUser = await updateUser(user.id, {
      email,
      password: hashedPassword || undefined,
    });

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Successfully updated user' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
});
