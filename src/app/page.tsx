import { Suspense } from 'react'
import Banner from './components/home/Banner'
import Alerts from './components/home/Alerts/Alerts'
import Events from './components/home/Events/Events'
import InstagramFeed from './components/home/InstagramFeed'
import News from './components/home/News/News'
import Weather from './components/home/Weather'
import FacebookFeed from './components/home/FacebookFeed'
import Subscribe from './components/home/Subscribe'
import FormSuccess from './components/home/FormSuccess'
import styles from '../styles/home.module.scss'
import { Metadata } from 'next'

import '../styles/globals.scss'

export default async function Home() {

  return (
    <main>
      <Banner />
      <section>
        <div className={styles.grid}>
          <Alerts />
          <Events />
          <InstagramFeed />
          <News />
          <Weather />
          <FacebookFeed />
          <Subscribe />
        </div>
      </section>
      <FormSuccess />
    </main>
  )
}
