'use client'

import React from 'react'

import styles from '../../../styles/banner.module.scss'

const Banner = () => {
  return (
    <section id={styles['banner']}>
        <div className={styles.container}>
            <article>
                <h1>Sachse, TX</h1>
                <p>Welcome to the Sachse, Texas Community Site - your one-stop spot for information. Explore up-to-date news, events, police-issued alerts, 
                    trash pickup information, jobs, and more for an enriched city experience.
                </p>
            </article>
        </div>
    </section>
  )
}

export default Banner;