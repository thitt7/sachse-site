'use client'

import Link from 'next/link'
import styles from '../styles/header.module.scss'

import React, { useState, useEffect } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';

const Header = () => {
    const mobile = useMediaQuery('(max-width:860px)');
    const desktop = useMediaQuery('(min-width:860px)');

    return (
        <>
            <header className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.category}>
                        <div className="logo">
                            Sachse Site
                        </div>
                        <Link href="/alerts">Alerts</Link>
                        <Link href="/news">News</Link>
                        <Link href="/events">Events</Link>
                        <Link href="/bulktrash">Bulk Trash</Link>
                        <Link href=""></Link>
                    </div>
                    <div className={styles.settings}>

                    </div>
                </div>
            </header>
        </>
    )
}

export default Header