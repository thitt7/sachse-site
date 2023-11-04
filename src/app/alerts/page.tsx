import React from "react";
import Client from "./Client";
import getAlerts from "@/lib/getAlerts";
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Alerts | Sachse Community Site',
    description: 'Stay informed and safe with real-time alerts directly from the Sachse, Texas police department. Get timely updates on emergency situations, weather advisories, road closures, and more.',

    generator: 'Next.js',
    applicationName: 'Next.js',
    referrer: 'origin-when-cross-origin',
    keywords: ['Sachse', 'Sachse, Texas', 'Sachse Alerts', 'Sachse weather', 'sachse emergency'],
    authors: [{ name: 'Tristan Hitt', url: `https://sachse.city/alerts` }],
    colorScheme: 'dark',
    creator: 'Tristan Hitt',
    publisher: 'Sachse Community Site',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    alternates: {
      canonical: `https://sachse.city/alerts`
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
      title: 'Alerts | Sachse Community Site',
      description: 'Stay informed and safe with real-time alerts directly from the Sachse, Texas police department. Get timely updates on emergency situations, weather advisories, road closures, and more.',
      url: `https://sachse.city/alerts`,
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
      title: 'Alerts | Sachse Community Site',
      description: 'Stay informed and safe with real-time alerts directly from the Sachse, Texas police department. Get timely updates on emergency situations, weather advisories, road closures, and more.',
      siteId: '',
      creator: '',
      creatorId: '',
      images: '/banner-full.jpg',
    },
}

export default async function Alerts () {
   
    const alertArr = await getAlerts(undefined, 0, 10, 0)
    
    return (
        <>
        <Client Arr={alertArr}>
        </Client>
        </>
    )

}