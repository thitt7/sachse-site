'use client'
import React, {useState, useRef} from "react"

import MapsInput from "./addressForm"
import DayTable from "./dayTable"
import CircularProgress from '@mui/material/CircularProgress';

const Trash = () => {
    const [days, setDays] = useState([[]])
    const [errorState, setErrorState] = useState(false)
    const [loading, setLoading] = useState(false)

    const getTrashDays = async (address: string): Promise<void> => {
        const res = await fetch ('http://localhost:3000/api/trash', {
            method: 'POST', 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(address),
            cache: 'default'
          })
        console.log('initial res: ', res)
        if (res.status !== 200) {
            setErrorState(true)
            return
        }
        const result = await res.json()
        setErrorState(false)
        setDays(result)
        console.log(result)
      }
    
    return (
        <>
            <h2>Please enter your address below or allow us to use your location</h2>
            <MapsInput getTrashDays={getTrashDays}/>
            {days[0].length ? <DayTable days={days}/> : <></>}
            {errorState ? <p>You fucked up</p> : <></>}
        </>
    )

}

export default Trash