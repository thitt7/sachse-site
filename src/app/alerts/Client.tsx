'use client';
import { InView } from 'react-intersection-observer';
import AlertCard from "./alertCard";
// import Observer from "./Observer";
// import { getAlerts } from './page';
import styles from '../../styles/alerts.module.scss'

import React, { useState, useEffect } from "react";

const Client = ({children, Arr}: {children: React.ReactNode, Arr: string[]}) => {
    const [alerts, setAlerts] = useState(Arr)
    const [example, setExample] = useState([3, 4, 9, 7, 0, 1, 8, 3, 6, 2])
    console.log('alert state is: ', alerts)

    return (
        <>
        <div className={styles.container}>
            {alerts.map((alert: any, i: number) => {
                return (
                    <AlertCard alert={alert} i={i} key={i}/>
                )
            })}
        </div>
        <p>Example index: {example[0]}</p>
        {/* <Observer arr={alerts}/> */}
        <InView onChange={async (inView, entry) => {
                console.log('entry:', entry)
                const updatedAlerts = await pushAlerts(alerts)
                if (entry.isIntersecting) {
                    setAlerts(updatedAlerts)
                    setExample((example: any) => example + 1)
                }
            }}>
                {({ inView, ref, entry }) => (
                    <div ref={ref}>
                        <h2>{`Header inside viewport ${inView}.`}</h2>
                    </div>
                )}
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