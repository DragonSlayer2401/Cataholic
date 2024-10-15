import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req) {
  const { limit, page, breeds } = req.query;
}
