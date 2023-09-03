import Banner from './components/home/Banner'
import Alerts from './components/home/Alerts/Alerts'
import Events from './components/home/Events/Events'
import InstagramFeed from './components/home/InstagramFeed'
import News from './components/home/News/News'
import Weather from './components/home/Weather'
import FacebookFeed from './components/home/FacebookFeed'
import Subscribe from './components/home/Subscribe'
import styles from '../styles/home.module.scss'
import { Metadata } from 'next'

import '../styles/globals.scss'

export default async function Home() {

  return (
    <main>
      <Banner />
      <section>
        <div className={styles.grid}>
          {/* @ts-expect-error Async Server Component */}
          <Alerts />
          {/* <div>Alerts</div> */}
          {/* @ts-expect-error Async Server Component */}
          <Events />
          <InstagramFeed />
          {/* @ts-expect-error Async Server Component */}
          <News />
          {/* @ts-expect-error Async Server Component */}
          <Weather />
          <FacebookFeed />
          <Subscribe />
          {/* <iframe src="https://cityofsachse.justfoia.com/Forms/Launch/d705cbd6-1396-49b7-939e-8d86c5a87deb" frameBorder="0"></iframe> */}
        </div>
      </section>
    </main>
  )
}
