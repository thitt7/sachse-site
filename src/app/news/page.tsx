import React from "react";
import Client from "./Client";
import getNews from "@/lib/getNews";

export default async function News () {
    const newsArr = await getNews(undefined, 10, 0)
    
    return (
        <Client Arr={newsArr}>
        </Client>
    )

}