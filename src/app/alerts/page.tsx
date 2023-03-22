import React from "react";
import Link from 'next/link'

export default async function Alerts () {

    const alertResponse = await getAlerts()
    
    return (
        <>
            <ul>
                {alertResponse.map((alert: any, i: number) => {
                return (
                    <Link href={`/alerts/${alert._id}`}>
                        <li key={i}>{alert.body}</li>
                    </Link>
                )
            })}
            </ul>
        </>
    )

}

async function getAlerts() {
    const res = await fetch(`http://localhost:${process.env.PORT}/api/alerts`, { cache: 'no-store' });
    console.log('res is: ',res)
    return res.json();
  }