'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import styles from '../../../../styles/home.module.scss'

const Client = ({ news }: { news: any }) => {

  const calendarIcon = <CalendarTodayIcon sx={{fontSize: '1rem'}}/>

  return (
    <div className={styles.news}>
      <Link href={'/news'}>
        <h3>News</h3>
      </Link>
      <div className={styles.container}>
        {news.map((article: any, i: number) => {
          const millisecondsinday = 86400000;
          const [daysElapsed, setDaysElapsed] = useState(Math.round((Date.now() - new Date(article.createdAt).getTime()) / millisecondsinday));
          const formattedDate = new Date(article.createdAt).toDateString().slice(3)

          const { URL, title, author, body, category, createdAt, img, slug } = article

          return (
            <>
            <article className={styles.article} key={i}>
              <div className={styles.clearfix}>
                <img className={styles.image} src={img.src} alt={img.alt} />
                <h2>{title}</h2>
                <p className={styles.p} dangerouslySetInnerHTML={{ __html: `${body.text.substring(0, 100)}${body.text.length>100 ? '...' : ''}` }}></p>
              </div>
              <div className={styles.info}>
              <span> {calendarIcon}{daysElapsed < 29 ? `${daysElapsed} day${daysElapsed != 1 ? 's' : ''} ago` : formattedDate}</span>
                <Link href={`/news/${slug}`}>
                  <button style={{margin: 0}}>READ MORE</button>
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