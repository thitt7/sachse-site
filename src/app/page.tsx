import Weather from './Weather'
import Alerts from './Alerts'
import { Metadata } from 'next'

import '../styles/globals.scss'

export default async function Home() {

  return (
    <main>
      {/* @ts-expect-error Async Server Component */}
      <Alerts />
      {/* @ts-expect-error Async Server Component */}
      <Weather />
    </main>
  )
}
