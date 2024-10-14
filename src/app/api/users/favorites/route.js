import { withAuth } from '@/lib/middleware/withAuth';
import { NextResponse } from 'next/server';

export const PUT = withAuth(async (req) => {
    const body = await req.json(); 
    const { favorites } = body;
    const user = req.user;
});