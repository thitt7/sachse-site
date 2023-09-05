'use client'

import React from 'react'

import { Parallax, Background } from 'react-parallax';
import styles from '../../../styles/banner.module.scss';

const style = {height: '100vh'}
const imgStyle = {height: '100%', filter: 'brightness(0.85)'}
const imgAlt = 'aerial view of Sachse, Texas'

const Banner = () => {
  return (
    <Parallax style={style} bgImage="/banner-full.jpg" bgImageAlt={imgAlt} strength={300} bgClassName={styles.parallax} bgImageStyle={imgStyle}>
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
    </Parallax>
  )
}

export default Banner;