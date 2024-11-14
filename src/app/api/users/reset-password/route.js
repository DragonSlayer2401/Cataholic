import {
  findUserById,
  hashPassword,
  updateUser,
} from '@/controllers/userController';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const PUT = async (req) => {
  try {
    const body = await req.json();
    const { newPassword, token } = body;
    let decoded;

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized: No token provided' },
        { status: 401 }
      );
    }

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = decoded.data.id;
    const foundUser = await findUserById(userId);
   
    if (foundUser) {
      const hashedPassword = await hashPassword(newPassword);

      const updatedUser = await updateUser(userId, { password: hashedPassword });

      if (!updatedUser) {
        return NextResponse.json(
          { message: 'User failed to be updated' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: 'Successfully updated user' },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
};
