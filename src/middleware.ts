import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const allowedOrigins = [
    /* change to https://sachse.city in prod */
    "http://192.168.1.246:3000"
  ];
  export function middleware(request: NextRequest) {
    
    const requestHeaders = new Headers(request.headers);
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  
    const origin = requestHeaders.get('origin');
    // if ( 1 ) {
    //   console.log('setting headers')
    //   response.headers.set('Access-Control-Allow-Origin', "*")
    //   response.headers.set('Access-Control-Allow-Credentials', "true")
    //   response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    // }
    
    console.log('in middleware')
    // console.log('REQ HEADERS: ', requestHeaders)
    // console.log('ORIGIN: origin')
    // console.log('REQUEST: ', request)
    // console.log('RESPONSE HEADERS: ', response.headers)
  
    return response
  }