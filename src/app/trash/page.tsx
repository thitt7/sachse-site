import MapsInput from "./addressForm"

const Trash = async () => {
    
    return (
        <div id="main" className="container">
            <h1>Trash Pickup Information</h1>
            <p>Please type your address into the form below to check your next trash pickup days. Alternatively, you may grant this site permission to use your location
                 by clicking "Allow" when prompted and your address will be estimated. This feature works not only for Sachse residents but for any residents of any city
                 that is serviced by Community Waste Disposal.
            </p>
            {/* <h2>Address:</h2> */}
            <MapsInput />
        </div>
    )

}

export default Trash