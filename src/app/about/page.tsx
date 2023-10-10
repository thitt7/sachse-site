import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About | Sachse Community Site',
    description: 'Celebrate our Sachse community story and get to know the creator. Get to know about the motivation and person behind the site.',

    generator: 'Next.js',
    applicationName: 'Next.js',
    referrer: 'origin-when-cross-origin',
    keywords: ['Sachse', 'Sachse, Texas', 'sachse site', 'sachse community'],
    authors: [{ name: 'Tristan Hitt', url: `https://sachse.city/about` }],
    colorScheme: 'dark',
    creator: 'Tristan Hitt',
    publisher: 'Sachse Community Site',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    alternates: {
      canonical: `https://sachse.city/about`
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
      title: 'About | Sachse Community Site',
      description: 'Celebrate our Sachse community story and get to know the creator. Get to know about the motivation and person behind the site.',
      url: `https://sachse.city/about`,
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
      title: 'About | Sachse Community Site',
      description: 'Celebrate our Sachse community story and get to know the creator. Get to know about the motivation and person behind the site.',
      siteId: '',
      creator: '',
      creatorId: '',
      images: '/banner-full.jpg',
    },
}

const About = () => {
  return (
    <section id="about">
        <div className="container">
            <h1>About</h1>
            <p>This is a passion project created and maintained by a fellow Sachse resident and local web developer. I saw where I thought the city's website could be improved
                and added features and content that I wanted it to have. The site strives to serve as a central hub which aggregates data from various other sources including alerts from the police 
                 department, news, events, trash pickup information, and jobs through custom web scrapers to gather the data. The mission is to provide a more intimate view of the goings
                  on in the city while avoiding some of the pitfalls of something like a social media site.</p>
        </div>
    </section>
  )
}

export default About;