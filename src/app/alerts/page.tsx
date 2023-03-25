import React from "react";
import AlertCard from "./alertCard";
import styles from '../../styles/alerts.module.scss'

export default async function Alerts () {

    const alertResponse = await getAlerts()
    
    return (
        <div className={styles.container}>
            {alertResponse.map((alert: any, i: number) => {
                return (
                    <AlertCard alert={alert} i={i}/>
                )
            })}
        </div>
    )

}

async function getAlerts() {
    const res = await fetch(`http://localhost:${process.env.PORT}/api/alerts`, { 
        next: { revalidate: 5 }
    });
    console.log('res is: ',res)
    return res.json();
  }