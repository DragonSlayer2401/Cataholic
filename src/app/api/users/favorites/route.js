import { findFavorites } from '@/controllers/userController';
import { withAuth } from '@/lib/middleware/withAuth';
import { NextResponse } from 'next/server';

export const GET = withAuth(async (req) => {
  try {
    const user = req.user;
    const favorites = await findFavorites(user.id);
   
    return NextResponse.json(
      { message: 'Successfully retrieved favorites', favorites },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
});
