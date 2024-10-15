import { NextResponse } from 'next/server';
import { findBreedIds } from '@/controllers/imageController';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get('limit');
  const page = searchParams.get('page');
  const breeds = searchParams.get('breeds')?.split(',');
  let response;

  if (breeds && breeds.length > 0) {
    const breedIds = findBreedIds(breeds);

    if (breedIds.length === 0) {
      return NextResponse.json(
        { message: `Sorry, we do not have any ${breeds.join(', ')} images` },
        { status: 404 }
      );
    }

    response = await findImagesByBreeds(limit, page, 'RAND', breedIds);
  } else {
    response = await findRandomImages(limit, page, 'RAND');
  }

  if (response.status !== 200) {
    return NextResponse.json(
      { message: response.message },
      { status: response.status }
    );
  }

  return NextResponse.json(
    {
      imageDataArray: response.imageDataArray,
      message: 'Successfully retrieved images',
    },
    { status: 200 }
  );
}
