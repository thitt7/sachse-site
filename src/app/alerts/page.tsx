import React from "react";
import Client from "./Client";


export default async function Alerts () {
    let limit: number = 10
    let page: number = 0
    let offset: number = 0
    let alertArr: any
    alertArr = await getAlerts(page, limit, offset)
    
    return (
        <Client Arr={alertArr}>

        </Client>
    )

}

const getAlerts = async (page: number, limit: number, offset: number) => {
    const res = await fetch(`http://localhost:${process.env.PORT}/api/alerts?page=${page}&limit=${limit}&offset=${offset}`, { 
        next: { revalidate: 5 }
    });
    // console.log('res is: ',res)
    return res.json();
  }