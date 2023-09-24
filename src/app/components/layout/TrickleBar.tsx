'use client';

import React, {useEffect, useState} from 'react';
import NextTopLoader from 'nextjs-toploader';

type StyleObject = {
    [key: string]: string;
  };

const TrickleBar = () => {

    const [height, setHeight] = useState('')

    useEffect(() => {
        setHeight(document.querySelector('header')?.offsetHeight.toString()!)

        // const styles: StyleObject = {
        //     top: headerHeight + 'px',
        //     boxShadow: "0 0 10px #29d, 0 0 5px #29d", 
        // }
        // const el: any = document.querySelector("#nprogress .bar")!
        // const header: any = document.querySelector("header")!
        // for(let prop of Object.keys(styles)){
        //     (document.querySelector("#nprogress .bar")! as any).style[prop.toString()] = styles[prop.toString()];
        //     header.style[prop.toString()] = styles[prop.toString()];
        //   }
    })

  return (
    <>
        <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
        />
        <style>
            {`
                #nprogress { pointer-events: none; }
                #nprogress .bar { top: ${height}px !important; background: #FF5F1F !important; position: fixed; z-index: 1031; left: 0; width: 100%; height: 3px; box-shadow: 0px 0px 5px #FF5F1F !important; }
                #nprogress .peg { display: none !important; }
            `}
        </style>
    </>
  )
}

export default TrickleBar;