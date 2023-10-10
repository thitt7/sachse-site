import MapsInput from "./addressForm"
import styles from "../../styles/trash.module.scss";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Trash Pickup | Sachse Community Site',
    description: 'Get real time information on trash pickup days for Sachse, Texas or any city that uses Community Waste Disposal',

    generator: 'Next.js',
    applicationName: 'Next.js',
    referrer: 'origin-when-cross-origin',
    keywords: ['Sachse', 'Sachse, Texas', 'sachse trash', 'CWD trash', 'CWD trash day'],
    authors: [{ name: 'Tristan Hitt', url: `https://sachse.city/trash` }],
    colorScheme: 'dark',
    creator: 'Tristan Hitt',
    publisher: 'Sachse Community Site',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    alternates: {
      canonical: `https://sachse.city/trash`
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
      title: 'Trash Pickup | Sachse Community Site',
      description: 'Get real time information on trash pickup days for Sachse, Texas or any city that uses Community Waste Disposal',
      url: `https://sachse.city/trash`,
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
      title: 'Trash Pickup | Sachse Community Site',
      description: 'Get real time information on trash pickup days for Sachse, Texas or any city that uses Community Waste Disposal',
      siteId: '',
      creator: '',
      creatorId: '',
      images: '/banner-full.jpg',
    },
}

const Trash = async () => {
    
    return (
        <div id={styles['container']}>
            <h1>Trash Pickup Information</h1>
            <p>Please type your address into the form below to check your next trash pickup days. Alternatively, you may grant this site permission to use your location
                 by clicking "Allow" when prompted and your address will be estimated. This feature works not only for Sachse residents but for any residents of any city
                 that is serviced by Community Waste Disposal.
            </p>
            <MapsInput />
        </div>
    )

}

export default Trash