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

          const { URL, title, author, body, category, createdAt, img, slug } = article
          
          const getTimeElapsed = () => {
            const millisecondsinday = 86400000;
            const days = (Date.now() - new Date(article.createdAt).getTime()) / millisecondsinday
            const daysElapsed = Math.round(days)
            const hoursElapsed = Math.round(days * 24)
            const formattedDate = new Date(article.createdAt).toDateString().slice(3)
            
            let timeElapsed;
            if (daysElapsed < 29) {
              if (daysElapsed < 1) {timeElapsed = `${hoursElapsed} hour${hoursElapsed > 1 ? 's' : ''} ago`}
              else {timeElapsed = `${daysElapsed} day${daysElapsed > 1 ? 's' : ''} ago`}
            }
            else {timeElapsed = formattedDate}
            return timeElapsed;
          }

          return (
            <>
            <article className={styles.article} key={i}>
              <div className={styles.clearfix}>
                <img className={styles.image} src={img.src} alt={img.alt} />
                <h2>{title}</h2>
                <p className={styles.p} dangerouslySetInnerHTML={{ __html: `${body.text.substring(0, 100)}${body.text.length>100 ? '...' : ''}` }}></p>
              </div>
              <div className={styles.info}>
              <span> {calendarIcon}{getTimeElapsed()}</span>
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