import { addFavorites } from '@/controllers/userController';
import { withAuth } from '@/lib/middleware/withAuth';
import { NextResponse } from 'next/server';

export const POST = withAuth(async (req) => {
  try {
    const user = req.user;
    const body = await req.json();
    const { id, alt, src } = body;

    const addedFavorite = await addFavorites(user.id, { id, alt, src });

    if (!addedFavorite) {
      return NextResponse.json(
        { message: 'Favorite already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully added favorite' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
});
