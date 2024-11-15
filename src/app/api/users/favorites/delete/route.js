import { deleteFavorites } from '@/controllers/userController';
import { withAuth } from '@/lib/middleware/withAuth';
import { NextResponse } from 'next/server';

export const DELETE = withAuth(async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const user = req.user;
    const id = searchParams.get('id');

    const deletedFavorite = await deleteFavorites(user.id, id);

    if (!deletedFavorite) {
      return NextResponse.json(
        { message: 'Favorite not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully deleted favorite' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
});
