import { NextResponse } from 'next/server';

export async function GET( request: Request, { params }: { params: { coordinates: string } } ) {
    const coordinates = params.coordinates.toString();
    let split = coordinates!.split(',')

    const result = await fetch (`https://maps.googleapis.com/maps/api/geocode/json?latlng=${split[0]},${split[1]}&key=${process.env.GOOGLE_MAPS_API_KEY_SERVER}`);
    const response = await result.json()
    console.log('RES: ', response)
    if (response.status == 'OK') {return NextResponse.json(response.results[0])}
    else {
        return new Response('Failed to retrieve trash data', { status: 500, headers: { 'error': response.error_message } })
    }

  }