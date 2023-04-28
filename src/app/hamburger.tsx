'use client';

import React, { useState, useRef } from "react";

const Hamburger = () => {

    return (
        <div id="hamburger" onClick={handleHamburgerClick}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export const handleHamburgerClick = (e: any) => { document.querySelector('#hamburger')!.classList.toggle('open') }

export default Hamburger