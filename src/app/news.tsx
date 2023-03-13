import React from "react";

export default async function News () {

    const newsData = await getNews()
    console.log(newsData)
    
    return (
        <>
            <h2>News Component</h2>
        </>
    )

}

async function getNews() {
    const res = await fetch(`http://localhost:${process.env.PORT}/api/news`, { cache: 'no-store' });
    // console.log(res)
    return res.json();
  }