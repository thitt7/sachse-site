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
import { Metadata } from 'next';

import '../styles/globals.scss';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Sachse Community Site - Sachse, Texas Updates & More',
    description: 'Discover the community site for Sachse, Texas. The go-to source for the latest news, events, job opportunities, and up-to-date resources.',

    generator: 'Next.js',
    applicationName: 'Next.js',
    referrer: 'origin-when-cross-origin',
    keywords: ['Sachse', 'Sachse, Texas'],
    authors: [{ name: 'Tristan Hitt', url: 'https://sachse.city' }],
    colorScheme: 'dark',
    creator: 'Tristan Hitt',
    publisher: 'Sachse Community Site',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    alternates: {
      canonical: `https://sachse.city`
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    openGraph: {
      title: 'Sachse Community Site - Sachse, Texas Updates & More',
      description: 'Discover the community site for Sachse, Texas. The go-to source for the latest news, events, job opportunities, and up-to-date resources.',
      url: `https://sachse.city`,
      publishedTime: new Date().toISOString(),
      authors: ['Tristan Hitt'],
      siteName: 'sachse.city',
      images: [
        {
          url: '/banner-full.jpg',
          width: 800,
          height: 600,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },

    twitter: {
      card: 'summary_large_image',
      site: '',
      title: 'Sachse Community Site - Sachse, Texas Updates & More',
      description: 'Discover the community site for Sachse, Texas. The go-to source for the latest news, events, job opportunities, and up-to-date resources.',
      siteId: '',
      creator: '',
      creatorId: '',
      images: '/banner-full.jpg',
    },
}

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
