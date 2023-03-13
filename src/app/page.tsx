import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import News from './news'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.lame}>
      <h1>This is 'page' content</h1>
      <News/>
    </main>
  )
}
