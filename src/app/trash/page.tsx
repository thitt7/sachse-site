import MapsInput from "./addressForm"
import DayTable from "./dayTable"
import CircularProgress from '@mui/material/CircularProgress';

const Trash = async () => {
    
    return (
        <div id="main">
            <h2>Please enter your address below or allow us to use your location</h2>
            <MapsInput />
        </div>
    )

}

export default Trash