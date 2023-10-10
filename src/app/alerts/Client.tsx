'use client';

import React, { useState } from "react";
// import { InView } from 'react-intersection-observer';
import AlertCard from "./alertCard";
import CircularProgress from '@mui/material/CircularProgress';
import styles from '../../styles/alerts.module.scss';
import getAlerts from "@/lib/getAlerts";

const Client = ({children, Arr}: {children: React.ReactNode, Arr: string[]}) => {
    const [alerts, setAlerts] = useState(Arr)
    const [isLoading, setLoading] = useState(false)

    const pushAlerts = async (e: React.MouseEvent<HTMLElement>) => {
            setLoading(true)
            const res = await getAlerts(undefined, 10, Arr.length)
            res.map( (e: string) => {Arr.push(e)})
            setAlerts(Arr)
            setLoading(false)
    }

    return (
        <div className={styles.container}>
            <div className="head">
                <h1>Alerts</h1>
                <p>
                    Stay informed and safe with real-time alerts directly from the Sachse, Texas police department. Get timely updates on emergency situations, weather advisories, road closures, and more.
                </p>
            </div>
            <div className={styles.alertsContainer}>
                {alerts.map((alert: any, i: number) => {
                    return (
                        <AlertCard alert={alert} i={i} key={i} />
                    )
                })}
            </div>
            {isLoading == true ? <div className={styles.progress}><CircularProgress /></div> : <></>}
            <button onClick={pushAlerts}>Load More</button>
            {/* <InView onChange={async (inView, entry) => {
                console.log('entry:', entry)
                if (entry.isIntersecting) {
                    setLoading(true)
                    const updatedAlerts = await pushAlerts(alerts)
                    setAlerts(updatedAlerts)
                    setLoading(false)
                }
            }}>
            </InView> */}
        </div>
    )

}

export default Client;