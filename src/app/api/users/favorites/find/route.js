import { findFavorite } from '@/controllers/userController';
import { withAuth } from '@/lib/middleware/withAuth';
import { NextResponse } from 'next/server';

export const GET = withAuth(async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const user = req.user;
    const id = searchParams.get('id');
    const foundFavorite = await findFavorite(user.id, id);

    if (!foundFavorite) {
      return NextResponse.json(
        { message: 'Favorite not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully found favorite' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
});
