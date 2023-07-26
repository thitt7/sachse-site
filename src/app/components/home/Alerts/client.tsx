'use client'

import React from 'react'
import Link from 'next/link';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../../../../styles/home.module.scss'

const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const Client = ({ alerts }: { alerts: any }) => {
    return (
        <div className={styles.alerts}>
            <Link href={'/alerts'}>
                <h3>Alerts</h3>
            </Link>
            <div className={styles.container}>
                <Slider className={styles.slick} {...settings}>
                    {alerts.map((alert: any, i: number) => {
                        return (
                            <div className={styles.alert} key={i}>
                                <h2>{alert.title}</h2>
                                <p dangerouslySetInnerHTML={{ __html: `${alert.body.substring(0, 100)}${alert.body.length>100 ? '...' : ''}` }}></p>
                                <div>
                                    <time dateTime={alert.createdAt}>{new Date(alert.createdAt).toLocaleString()}</time>
                                    <Link href={`/alerts/${alert._id}`}>
                                        <button>READ MORE</button>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

export default Client