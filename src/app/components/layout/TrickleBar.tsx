'use client';

import React, {useEffect, useState} from 'react';
import NextTopLoader from 'nextjs-toploader';
import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation';

type StyleObject = {
    [key: string]: string;
  };

const routeBlackList: any = {
  events: true,
}

const TrickleBar = () => {

    const pathName = usePathname()
    const params = useSearchParams()

    const [height, setHeight] = useState('')

    useEffect(() => {
        setHeight(document.querySelector('header')?.offsetHeight.toString()!)
    })

    if ((routeBlackList[pathName?.replace('/', '') as string])) { return null}
    else {
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
}

export default TrickleBar;