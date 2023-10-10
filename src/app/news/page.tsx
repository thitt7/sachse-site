import React from "react";
import Client from "./Client";
import getNews from "@/lib/getNews";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'News | Sachse Community Site',
    description: 'Discover the latest news and updates from Sachse, Texas, on our News page. Stay up on local sports, community developments, and important stories that matter most to our city.',

    generator: 'Next.js',
    applicationName: 'Next.js',
    referrer: 'origin-when-cross-origin',
    keywords: ['Sachse', 'Sachse, Texas', 'sachse news', 'sachse events', 'sachse sports'],
    authors: [{ name: 'Tristan Hitt', url: `https://sachse.city/news` }],
    colorScheme: 'dark',
    creator: 'Tristan Hitt',
    publisher: 'Sachse Community Site',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    alternates: {
      canonical: `https://sachse.city/news`
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
      title: 'News | Sachse Community Site',
      description: 'Discover the latest news and updates from Sachse, Texas, on our News page. Stay up on local sports, community developments, and important stories that matter most to our city.',
      url: `https://sachse.city/news`,
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
      title: 'News | Sachse Community Site',
      description: 'Discover the latest news and updates from Sachse, Texas, on our News page. Stay up on local sports, community developments, and important stories that matter most to our city.',
      siteId: '',
      creator: '',
      creatorId: '',
      images: '/banner-full.jpg',
    },
}

export default async function News() {
    const newsArr = await getNews(undefined, 10, 0)

    return (
        <>
            <Client Arr={newsArr}>
            </Client>
        </>
    )

}