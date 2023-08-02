'use client'

import React from 'react'
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import getNews from '@/lib/getNews';

import styles from '../../../../styles/home.module.scss'

const Client = ({ news }: { news: any }) => {

  return (
    <div className={styles.news}>
      <Link href={'/news'}>
        <h3>News</h3>
      </Link>
      <div className={styles.container}>
        {news.map((news: any, i: number) => {
          const { URL, title, author, body, category, createdAt, img, slug } = news

          return (
            <>
            <article className={styles.article} key={i}>
              <div className={styles.clearfix}>
                <img className={styles.image} src={img.src} alt={img.alt} />
                <h2>{title}</h2>
                <p className={styles.p} dangerouslySetInnerHTML={{ __html: `${body.text.substring(0, 100)}${body.text.length>100 ? '...' : ''}` }}></p>
              </div>
              <div className={styles.info}>
                <div>{author}</div>
                <Link href={`/news/${slug}`}>
                  <button>READ MORE</button>
                </Link>
              </div>
            </article>
            <Divider variant="middle" />
            </>

          )
        })}
      </div>
    </div>
  )
}

export default Client