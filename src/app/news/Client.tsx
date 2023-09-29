'use client';

import React, { useState } from "react";
import getNews from "@/lib/getNews";
import { InView } from 'react-intersection-observer';
import NewsCard from "./newsCard";
import CircularProgress from '@mui/material/CircularProgress';
import styles from '../../styles/alerts.module.scss'

const Client = ({children, Arr}: {children: React.ReactNode, Arr: string[]}) => {
    const [news, setNews] = useState(Arr)
    const [isLoading, setIsLoading] = useState(false)
    const [example, setExample] = useState([3, 4, 9, 7, 0, 1, 8, 3, 6, 2])

    return (
        <>
        <div className="news-card-container">
            {news.map((news: any, i: number) => {
                return (
                    <NewsCard news={news} i={i} key={i}/>
                )
            })}
        </div>
        {isLoading == true ? <div className='progress'><CircularProgress /></div> : <></>}
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
        </>
    )

}

export const pushNews = async (Arr: string[]): Promise<string[]> => {
    console.log('pushing news...')
    const res = await getNews(undefined, 10, Arr.length)
    res.map( (e: string) => {Arr.push(e)})
    return Arr
}

export default Client