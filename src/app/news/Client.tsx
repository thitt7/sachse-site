'use client';

import React, { useState } from "react";
import getNews from "@/lib/getNews";
// import { InView } from 'react-intersection-observer';
import NewsCard from "./newsCard";
import CircularProgress from '@mui/material/CircularProgress';
import styles from '../../styles/news.module.scss';

const Client = ({children, Arr}: {children: React.ReactNode, Arr: string[]}) => {
    const [news, setNews] = useState(Arr)
    const [isLoading, setLoading] = useState(false)

    const pushNews = async (e: React.MouseEvent<HTMLElement>) => {
        setLoading(true)
        const res = await getNews(undefined, 10, Arr.length)
        res.map( (e: string) => {Arr.push(e)})
        setNews(Arr)
        setLoading(false)
    }

    return (
        <div id={styles['container']}>
        <div className={styles.newsContainer}>
            {news.map((news: any, i: number) => {
                return (
                    <NewsCard news={news} i={i} key={i}/>
                )
            })}
        </div>
        {isLoading == true ? <div className={styles.progress}><CircularProgress /></div> : <></>}
        <button onClick={pushNews}>Load More</button>
        
        {/* <InView onChange={async (inView, entry) => {
                console.log('entry:', entry)
                if (entry.isIntersecting) {
                    setIsLoading(true)
                    const updatedAlerts = await pushNews(news)
                    setNews(updatedAlerts)
                    setExample((example: any) => example + 1)
                    setIsLoading(false)
                }
            }}>
        </InView> */}
        </div>
    )

}

export default Client;