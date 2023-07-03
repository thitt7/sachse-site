import React from "react";
import "../../styles/_alertSlider.scss";


const AlertBox: React.FC<Props> = ({alert, i}: Props) => {
    return (
        <>
            <div className="alertBox">
                <div className="col-3">
                    <img src="" alt="Alert Image" />
                </div>
                <div className="col-6 content">
                    <p>Text</p>
                </div>
            </div>
        </>
    );
}

export default AlertBox

