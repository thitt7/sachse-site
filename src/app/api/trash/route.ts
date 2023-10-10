import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  
  const { searchParams } = new URL(request.url)
  const {address} = Object.fromEntries(searchParams.entries())

  const trashTable = await (await fetch (`${process.env.TRASH_API_URL}/api/trash?address=${address}`)).json()

  if (!trashTable[0].length) {
    return new Response('Failed to retrieve trash data', { status: 504 })
    // return NextResponse.json(dummyData)
  }
  else {return NextResponse.json(trashTable)}

}