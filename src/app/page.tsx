import Image from 'next/image'
import { Inter } from '@next/font/google'
import '../styles/globals.scss'
import News from './news'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <h1>This is 'page' content</h1>
      {/* @ts-expect-error Async Server Component */}
      <News/>
    </main>
  )
}
