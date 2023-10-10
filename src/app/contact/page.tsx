import React from 'react';
import Client from './client';
import styles from '../../styles/contact.module.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Sachse Community Site',
    description: 'Connect with us easily on our Contact page. Reach out directly and we will be happy to get in touch and adress it.',

    generator: 'Next.js',
    applicationName: 'Next.js',
    referrer: 'origin-when-cross-origin',
    keywords: ['Sachse', 'Sachse, Texas', 'sachse contact', 'sachse community'],
    authors: [{ name: 'Tristan Hitt', url: `https://sachse.city/contact` }],
    colorScheme: 'dark',
    creator: 'Tristan Hitt',
    publisher: 'Sachse Community Site',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    alternates: {
      canonical: `https://sachse.city/contact`
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
      title: 'Contact | Sachse Community Site',
      description: 'Connect with us easily on our Contact page. Reach out directly and we will be happy to get in touch and adress it.',
      url: `https://sachse.city/contact`,
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
      title: 'Contact | Sachse Community Site',
      description: 'Connect with us easily on our Contact page. Reach out directly and we will be happy to get in touch and adress it.',
      siteId: '',
      creator: '',
      creatorId: '',
      images: '/banner-full.jpg',
    },
}

const Contact = () => {
  return (
    <section id={styles['main']}>
        <div className={styles.container}>
            <h1>Contact</h1>
            <p>
                One of the most vital elements to the site is feedback! For any complaints, suggestions, business inquiries, or anything else please feel free to reach out at any of the
                platforms listed below and I guarantee I'll get back to you and take your feedback seriously.
            </p>
            <Client />
        </div>
    </section>
  )
}

export default Contact