import React from "react";
import Client from "./Client";
import getAlerts from "@/lib/getAlerts";


export default async function Alerts () {
   
    const alertArr = await getAlerts(undefined, 0, 10, 0)
    
    return (
        <Client Arr={alertArr}>
        </Client>
    )

}

