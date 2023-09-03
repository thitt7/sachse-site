'use client'

import React from 'react'

import styles from '../../../styles/home.module.scss'

const FacebookFeed = () => {
    return (
        <div id={styles["fb-feed"]}>
            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcityofsachse%2F&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" width="340" height="500" style={{border:'none',overflow:'hidden'}} scrolling="no" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        </div>
    )
}

export default FacebookFeed;