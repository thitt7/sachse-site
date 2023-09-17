'use client'

import React from 'react'
import Link from 'next/link';

const NotFound = () => {
  return (
    <div id="not-found">
    <div className="container">
    <h2>404: Page Not Found!</h2>
    <p>We have failed you...this is not the page you were looking for. Click below to navigate back home!</p>
    <Link href={'/'}><button>Back Home</button></Link>
    </div>
  </div>
  )
}

export default NotFound;