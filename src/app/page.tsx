import Image from 'next/image'
import { Inter } from '@next/font/google'
import Example from './example'
import '../styles/globals.scss'

export default function Home() {
  return (
    <main>
      {/* @ts-expect-error Async Server Component */}
      <Example />
    </main>
  )
}
