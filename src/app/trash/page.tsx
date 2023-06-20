'use client'
import React, {useState} from "react"

import MapsInput from "./addressForm"
import DayTable from "./dayTable"
import CircularProgress from '@mui/material/CircularProgress';

const Trash = async () => {
    // const [days, setDays] = useState([[]])
    // const [errorState, setErrorState] = useState(false);
    // const [errorMsg, setErrorMsg] = useState('Please enter a valid residential address');
    // const [isLoading, setLoading] = useState(false);

    // const getTrashDays = async (address: string): Promise<void> => {
    //     console.log('hitting trash route endpoint')
    //     setLoading(true);
    //     // const res = await fetch (`/api/trash?address=${address}`)
    //     // setLoading(false);

    //     // if (res!.status !== 200) {
    //     //     setErrorState(true)
    //     //     return
    //     // }
    //     // const result = await res!.json();
    //     // console.log('trash API res: ', result)
    //     // setErrorState(false);
    //     // setDays(result);
    //   }
    
    return (
        <div id="main">
            <h2>Please enter your address below or allow us to use your location</h2>
            <MapsInput />
            {/* {isLoading == true ? <div className='progress'><CircularProgress /></div> : <></>}
            {days[0].length ? <DayTable days={days}/> : <></>}
            {errorState ? <p>Error: {errorMsg}</p> : <></>} */}
        </div>
    )

}

// const getGeoLocation = () => {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(getAddress);
//     }
// }

// const getAddress = async (position: any) => {
//   console.log(position.coords);
//   const res = await fetch (`/api/trash/${position.coords.latitude},${position.coords.longitude}`, { });
// }

export default Trash