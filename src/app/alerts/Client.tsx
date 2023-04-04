'use client';
import { InView } from 'react-intersection-observer';
import AlertCard from "./alertCard";
import CircularProgress from '@mui/material/CircularProgress';
// import Observer from "./Observer";
import styles from '../../styles/alerts.module.scss'

import React, { useState, useEffect } from "react";

const Client = ({children, Arr}: {children: React.ReactNode, Arr: string[]}) => {
    const [alerts, setAlerts] = useState(Arr)
    const [isLoading, setIsLoading] = useState(false)
    const [example, setExample] = useState([3, 4, 9, 7, 0, 1, 8, 3, 6, 2])

    return (
        <>
        <div className={styles.container}>
            {alerts.map((alert: any, i: number) => {
                return (
                    <AlertCard alert={alert} i={i} key={i}/>
                )
            })}
        </div>
        {/* <div className='progress'><CircularProgress /></div> */}
        {isLoading == true ? <div className='progress'><CircularProgress /></div> : <></>}
        <InView onChange={async (inView, entry) => {
                console.log('entry:', entry)
                if (entry.isIntersecting) {
                    setIsLoading(true)
                    const updatedAlerts = await pushAlerts(alerts)
                    setAlerts(updatedAlerts)
                    setExample((example: any) => example + 1)
                    setIsLoading(false)
                }
            }}>
        </InView>
        </>
    )

}

export async function getAlerts(page: number, limit: number, offset: number) {
    const res = await fetch(`http://localhost:3000/api/alerts?page=${page}&limit=${limit}&offset=${offset}`);
    console.log('client side fetch: ', `http://localhost:${process.env.PORT}/api/alerts?page=${page}&limit=${limit}&offset=${offset}`)
    return res.json();
  }

export const pushAlerts = async (Arr: string[]): Promise<string[]> => {
    console.log('pushing alerts...')
    const res = await getAlerts(0, 10, Arr.length)
    res.map( (e: string) => {Arr.push(e)})
    return Arr
}

export default Client