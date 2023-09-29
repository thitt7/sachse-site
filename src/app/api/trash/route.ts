import getTrash from '../(scrapers)/getTrash';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  
  const { searchParams } = new URL(request.url)
  const {address} = Object.fromEntries(searchParams.entries())

  const tableData = await getTrash(address as string)
  if (!tableData[0].length) {
    return new Response('Failed to retrieve trash data', { status: 204 })
  }
  else {return NextResponse.json(tableData)}

}