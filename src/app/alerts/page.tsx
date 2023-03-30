import React from "react";
import AlertCard from "./alertCard";
import Observer from "./Observer";
import styles from '../../styles/alerts.module.scss'

let alertArr: string[]
let limit: number = 10
let page: number, offset: string = ''

export default async function Alerts () {

    alertArr = await getAlerts(page, limit, offset)
    
    return (
        <div className={styles.container}>
            {alertArr.map((alert: any, i: number) => {
                return (
                    <AlertCard alert={alert} i={i} key={i}/>
                )
            })}
            <Observer/>
        </div>
    )

}

export const pushAlerts = async () => {
    console.log('pushing alerts...')
    // alertArr.push(await getAlerts(1, 10, alertArr.slice(-1).toString()))
}

async function getAlerts(page: number, limit: number, offset: string) {
    const res = await fetch(`http://localhost:${process.env.PORT}/api/alerts?page=${page}&limit=${limit}&offset=${offset}`, { 
        next: { revalidate: 5 }
    });
    // console.log('res is: ',res)
    return res.json();
  }