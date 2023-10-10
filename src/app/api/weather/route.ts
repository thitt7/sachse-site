import { NextResponse } from 'next/server';
import getWeather from './getWeather';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {

  const weather = await getWeather();

  return NextResponse.json(weather);

}