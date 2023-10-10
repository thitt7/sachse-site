import React from 'react'
import getNews from '@/lib/getNews';
import { Metadata } from 'next'

import ArticleInfo from './articleInfo';
import Tags from './tags';
import styles from '../../../styles/news.module.scss'

type Props = {
  params: { slug: string }
}

export const generateMetadata = async ({ params }: Props ): Promise<Metadata> => {
  const article = await getNews(params.slug);

  const { URL, title, author, body, category, createdAt, img, slug } = article[0];
  
  return {
    title: title + ' | Sachse Community Site',
    description: body.text.substring(0, 160),

    generator: 'Next.js',
    applicationName: 'Next.js',
    referrer: 'origin-when-cross-origin',
    keywords: ['sachse', 'sachse, Texas', 'sachse news', 'sachse events', 'sachse sports'],
    authors: [{ name: author, url: 'https://nextjs.org' }],
    colorScheme: 'dark',
    creator: 'Tristan Hitt',
    publisher: 'Sachse Community Site',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: `https://sachse.city/news/${slug}`
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
      description: body.text,
      url: `https://sachse.city/news/${slug}`,
      publishedTime: createdAt,
      authors: [author],
      siteName: 'sachse.city',
      images: [
        {
          url: img.src,
          width: 800,
          height: 600,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },

    twitter: {
      card: 'summary_large_image',
      title: title,
      description: body.text,
      siteId: '1467726470533754880',
      // creator: '@nextjs',
      creatorId: '1467726470533754880',
      images: [img.src],
    },
  }
}

const NewsArticle = async ({ params }: Props ) => {
  const article = await getNews(params.slug);

  const { URL, title, author, body, category, createdAt, img } = article[0];

  return (
    <div className={styles.articleContent}>
      <h2>{title}</h2>
      <ArticleInfo article={article} />
      <img src={img.src} alt={img.alt} />
      <div dangerouslySetInnerHTML={{ __html: body.html }} />
      <Tags article={article} />
    </div>
  )
}

export default NewsArticle;
