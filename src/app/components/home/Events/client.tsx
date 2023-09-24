'use client'

import React from 'react'
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Divider from '@mui/material/Divider';
import getEvents from '@/lib/getNews';

import styles from '../../../../styles/home.module.scss'

type Event = {
    title?: string,
    slug?: string,
    location?: string,
    address?: string,
    description?: { html: string, text: string },
    start?: Date,
    end?: Date,
    URL?: string,
    img?: { src: string, alt: string },
    allDay?: boolean
  }
  
type Props = {
    events: Event[]
}

const Client = ({ events }: Props) => {

  return (
    <div className={styles.events}>
      <Link href={'/events'}>
        <h3>
          Events
          <ArrowForwardIosIcon />
        </h3>
      </Link>
      <div className={styles.container}>
        {events.map((event: any, i: number) => {
          const { _id, URL, start, end, title, author, description, img } = event

          return (
            <>
              <article className={styles.article} key={i}>
                <div className={styles.clearfix}>
                  <h2>{title}</h2>
                  <time dateTime={start}>{new Date(start).toLocaleString()}</time>
                  {description ?
                    <p className={styles.p} dangerouslySetInnerHTML={{ __html: `${description.text.substring(0, 100)}${description.text.length > 100 ? '...' : ''}` }}></p>
                    : ''}
                </div>
                <div className={styles.info}>
                  <div>{author}</div>
                  <Link href={`/events/?id=${_id}`}>
                    <button style={{ margin: 0 }}>READ MORE</button>
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