// import React from 'react';
// import AlertCard from '../alertCard'
// import { Metadata } from 'next';
// import getAlerts from '@/lib/getAlerts';

// import styles from '../../../styles/alerts.module.scss'

// type Props = {
//     params: { id: string }
//     searchParams: { [key: string]: string | string[] | undefined }
//   }

// export const generateMetadata = async ({ params }: Props ): Promise<Metadata> => {
//   const alert = await getAlert(params.id)
//   const { URL, title, author, body, category, createdAt, img } = alert[0];

//   const text = body.replace(/<[^>]+>/g, '')
  
//   return {
//       title: `${title.substring(0, 150)} | Alerts`,
//       description: text.substring(0, 160),
  
//       generator: 'Next.js',
//       applicationName: 'Next.js',
//       referrer: 'origin-when-cross-origin',
//       keywords: ['Sachse', 'Sachse, Texas'],
//       // authors: [{ name: author, url: 'https://nextjs.org' }],
//       colorScheme: 'dark',
//       creator: 'Tristan Hitt',
//       publisher: 'Sachse Community Site',
//       formatDetection: {
//         email: true,
//         address: true,
//         telephone: true,
//       },
  
//       openGraph: {
//         title: title,
//         description: text.substring(0, 160),
//         url: `https://sachse.city/events?id=${params.id}`,
//         publishedTime: new Date(createdAt).toISOString(),
//         // authors: [author],
//         siteName: 'sachse.city',
//         images: [
//           {
//             url: img ? img.src: '',
//             width: 800,
//             height: 600,
//           },
//         ],
//         locale: 'en_US',
//         type: 'article',
//       },
  
//       twitter: {
//         card: 'summary_large_image',
//         site: '',
//         title: title,
//         description: text.substring(0, 160),
//         siteId: '',
//         creator: '',
//         creatorId: '',
//         images: img ? [img.src] : '',
//       },
//     }
// }

// const Alert = async ({params}: Props) => {

//     const alert = await getAlert(params.id)
//     const { URL, title, author, body, category, createdAt, img } = alert[0];

//   return (
//       <div className={styles.alertContainer}>
//           <AlertCard alert={alert[0]} />
//       </div>
//   )
// }

// const getAlert = async (id: string) => {
//     const alert = await fetch(`http://${process.env.HOSTNAME}:${process.env.PORT}/api/alerts/${id}`)
//     return await alert.json()
// }

// export default Alert;