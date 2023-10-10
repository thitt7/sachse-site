import React from 'react'
import Client from './client';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Subscribe | Sachse Community Site',
    description: 'Join our growing community by subscribing to our newsletter. Stay involved in exciting developments tailored to your preferences sent directly to your email.',

    generator: 'Next.js',
    applicationName: 'Next.js',
    referrer: 'origin-when-cross-origin',
    keywords: ['Sachse', 'Sachse, Texas', 'sachse newsletter',],
    authors: [{ name: 'Tristan Hitt', url: `https://sachse.city/subscribe` }],
    colorScheme: 'dark',
    creator: 'Tristan Hitt',
    publisher: 'Sachse Community Site',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    alternates: {
      canonical: `https://sachse.city/subscribe`
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
      title: 'Subscribe | Sachse Community Site',
      description: 'Join our growing community by subscribing to our newsletter. Stay involved in exciting developments tailored to your preferences sent directly to your email.',
      url: `https://sachse.city/subscribe`,
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
      title: 'Subscribe | Sachse Community Site',
      description: 'Join our growing community by subscribing to our newsletter. Stay involved in exciting developments tailored to your preferences sent directly to your email.',
      siteId: '',
      creator: '',
      creatorId: '',
      images: '/banner-full.jpg',
    },
}

const Subscribe = () => {
  return (
    <Client />
  )
}

export default Subscribe;