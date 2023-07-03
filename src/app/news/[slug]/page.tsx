import React from 'react'
import getArticle from "@/lib/getArticle";
import { Metadata } from 'next'

import ArticleInfo from './articleInfo';
import Tags from './tags';

type Props = {
  params: { slug: string }
}

export const generateMetadata = async ({ params }: Props ) => {
  const article = await getArticle(params.slug);

  const { URL, title, author, body, category, createdAt, img } = article[0];
  
  return {
    title: title,
    description: body,

    generator: 'Next.js',
    applicationName: 'Next.js',
    referrer: 'origin-when-cross-origin',
    keywords: ['Next.js', 'React', 'JavaScript'],
    authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
    colorScheme: 'dark',
    creator: 'Jiachi Liu',
    publisher: 'Sebastian Markbåge',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    openGraph: {
      title: 'Next.js',
      description: 'The React Framework for the Web',
      url: 'https://nextjs.org',
      publishedTime: '2023-01-01T00:00:00.000Z',
      authors: ['Seb', 'Josh'],
      siteName: 'Next.js',
      images: [
        {
          url: 'https://nextjs.org/og.png',
          width: 800,
          height: 600,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  }
}

const NewsArticle = async ({ params }: Props ) => {
  const article = await getArticle(params.slug);

  console.log('params: ', params);
  const { URL, title, author, body, category, createdAt, img } = article[0];

  return (
    <div className='article-content'>
      <h1>{title}</h1>
      <ArticleInfo article={article} />
      <img src={img} alt="" />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Tags article={article} />
    </div>
  )
}

export default NewsArticle;
