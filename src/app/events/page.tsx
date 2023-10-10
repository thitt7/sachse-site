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
    title: searchParams.id ? `${title} | Events` : 'Events | Sachse Community Site',
    description: description ? description.text.substring(0, 160) : '',

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
      canonical: `https://sachse.city/events?id=${searchParams.id}`
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
      title: title,
      description: description ? description.text : '',
      url: `https://sachse.city/events?id=${searchParams.id}`,
      publishedTime: pubDate ? pubDate : Date.now(),
      // authors: [author],
      siteName: 'sachse.city',
      images: [
        {
          url: img ? img.src: '',
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
      title: title,
      description: description ? description.text : '',
      siteId: '',
      creator: '',
      creatorId: '',
      images: img ? img.src : '',
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