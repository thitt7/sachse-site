'use client'

import React, { Suspense } from 'react';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slider from "react-slick";
import useMediaQuery from '@mui/material/useMediaQuery';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../../../../styles/home.module.scss'

const Client = ({ alerts }: { alerts: any }) => {

    const mobile = useMediaQuery('(max-width:480px)');
    const tablet = useMediaQuery('(max-width:768px)');

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
        slidesToShow: tablet ? 1 : 3,
        slidesToScroll: 1,
        mobileFirst: true,
    };

    return (
        <div className={styles.alerts}>
            <Link href={'/alerts'}>
                <h3>
                    Alerts
                    <ArrowForwardIosIcon />
                </h3>
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
                                        <button style={{margin: 0}}>READ MORE</button>
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