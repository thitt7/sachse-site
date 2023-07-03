import Image from 'next/image'
import { Inter } from '@next/font/google'
import Banner from './home/banner'
import AlertSlider from './alertSlider/alertSlider'
import Footer from './footer'
import '../styles/globals.scss'

export default function Home() {
  return (
    <main>
      {/* @ts-expect-error Async Server Component */}
      <Banner/>
      <AlertSlider/>
      <Footer/>
    </main>
  )
}
