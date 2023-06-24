import React from "react";
import Client from "./Client";


export default async function Alerts () {
    let limit: number = 10
    let page: number = 0
    let offset: number = 0
    let newsArr: any
    newsArr = await getNews(page, limit, offset)
    
    return (
        <Client Arr={newsArr}>
        </Client>
    )

}

const getNews = async (page: number, limit: number, offset: number) => {
    const res = await fetch(`http://localhost:${process.env.PORT}/api/news?page=${page}&limit=${limit}&offset=${offset}`, { 
        next: { revalidate: 5 }
    });

    return res.json();
  }