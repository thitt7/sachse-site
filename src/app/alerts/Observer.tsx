'use client';

import React from "react";
import { InView } from 'react-intersection-observer';
import { pushAlerts } from "./Client";

const Observer = ({arr}: {arr: string[]}) => {

    return (
        <>
            <InView onChange={(inView, entry) => {
                console.log('entry:', entry)
                pushAlerts(arr)
            }}>
                {({ inView, ref, entry }) => (
                    <div ref={ref}>
                        <h2>{`Header inside viewport ${inView}.`}</h2>
                    </div>
                )}
            </InView>
        </>
    )
}

export default Observer