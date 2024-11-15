import { findFavorites } from '@/controllers/userController';
import { withAuth } from '@/lib/middleware/withAuth';
import { NextResponse } from 'next/server';

export const GET = withAuth(async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const user = req.user;
    const limit = searchParams.get('limit');
    const lastItemCreationDate = searchParams.get('date');
    let favorites;

    if (lastItemCreationDate) {
      favorites = await findFavorites(user.id, limit, lastItemCreationDate);
    } else {
      favorites = await findFavorites(user.id, limit);
    }

    return NextResponse.json(
      { message: 'Successfully retrieved favorites', favorites },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
});
