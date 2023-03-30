'use client';

import React from "react";
import { InView } from 'react-intersection-observer';
import { pushAlerts } from "./page";

const Observer = () => {
    // const { ref, inView, entry } = useInView({
    //     /* Optional options */
    //     threshold: .75,
    //   });

    return (
        <>
            <InView onChange={(inView, entry) => {
                console.log('entry:', entry)
                pushAlerts()
            }}>
                {({ inView, ref, entry }) => (
                    <div ref={ref}>
                        <h2>{`Header inside viewport ${inView}.`}</h2>
                        <h3>{`Entry inside viewport ${entry}.`}</h3>
                    </div>
                )}
            </InView>
        </>
    )
}

export default Observer