'use client'

import React from 'react'

import { Parallax, Background } from 'react-parallax';
import styles from '../../../styles/banner.module.scss';

const style = {height: '100vh'}

const Banner = () => {
  return (
<section id={styles['banner']}>
    <Parallax style={style} bgImage="/banner-full.jpg" bgImageAlt="aerial view of Sachse, Texas" strength={300} bgImageStyle={{filter: 'brightness(0.85)'}}>
    
        <div className={styles.container}>
            <article>
                <h1>Sachse, TX</h1>
                <p>Welcome to the Sachse, Texas Community Site - your one-stop spot for information. Explore up-to-date news, events, police-issued alerts, 
                    trash pickup information, jobs, and more for an enriched city experience.
                </p>
            </article>
        </div>
    
    </Parallax>
    </section>
  )
}

export default Banner;