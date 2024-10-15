import { updateFavorites } from '@/controllers/userController';
import { withAuth } from '@/lib/middleware/withAuth';
import { NextResponse } from 'next/server';

export const PUT = withAuth(async (req) => {
  const body = await req.json();
  const { favorites } = body;
  const user = req.user;
  const updatedUser = await updateFavorites(user.id, favorites);

  if (updatedUser) {
    return NextResponse.json(
      {
        message: 'Favorites updated successfully',
        favorites: updatedUser.favorites,
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: 'Favorites failed to be updated' },
    { status: 500 }
  );
});
