import React from 'react'
import getEvents from '@/lib/getEvents';
import Client from './client';
import { Metadata } from 'next';

type metaProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const generateMetadata = async ({params, searchParams}: metaProps): Promise<Metadata> => {
  const event = await getEvents(searchParams.id as string)
  const { URL, img, title, address, description, start, end, location, pubDate} = event[0];
  
  return {
    title: title ? `${title} | Events` : 'Events | Sachse Community Site',
    description: description ? description.text.substring(0, 160) : 'Explore all the exciting events in Sachse and the surrounding area on our Events page. Find all the events you&apos;re looking for in one place',

    generator: 'Next.js',
    applicationName: 'Next.js',
    referrer: 'origin-when-cross-origin',
    keywords: ['Sachse', 'Sachse, Texas'],
    // authors: [{ name: author, url: 'https://nextjs.org' }],
    colorScheme: 'dark',
    creator: 'Tristan Hitt',
    publisher: 'Sachse Community Site',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    alternates: {
      canonical: searchParams.id ? `https://sachse.city/events?id=${searchParams.id}` : 'https://sachse.city/events'
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
      title: title ? `${title} | Events` : 'Events | Sachse Community Site',
      description: description ? description.text.substring(0, 160) : 'Explore all the exciting events in Sachse and the surrounding area on our Events page. Find all the events you&apos;re looking for in one place',
      url: searchParams.id ? `https://sachse.city/events?id=${searchParams.id}` : 'https://sachse.city/events',
      publishedTime: pubDate ? pubDate : Date.now(),
      // authors: [author],
      siteName: 'sachse.city',
      images: [
        {
          url: img ? img.src : '/banner-full.jpg',
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
      title: title ? `${title} | Events` : 'Events | Sachse Community Site',
      description: description ? description.text.substring(0, 160) : 'Explore all the exciting events in Sachse and the surrounding area on our Events page. Find all the events you&apos;re looking for in one place',
      siteId: '',
      creator: '',
      creatorId: '',
      images: img ? img.src : '/banner-full.jpg',
    },
  }
}

const Events = async () => {

  const events = await getEvents();

  return (
    <>
      <Client events={events} />
    </>
  )
}

const setEventID = (id: string) => {id}

export default Events;