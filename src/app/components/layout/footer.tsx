'use client'

import React from 'react';
import Link from 'next/link';
import { Divider } from '@mui/material';

import styles from '../../../styles/footer.module.scss';

const Footer = () => {

    const categories = ['Alerts', 'News', 'Events', 'Trash'];

    return (
        <footer id={styles['footer']}>
            <div className={styles.container}>
                <div className={styles.col}>
                    <h3>What&lsquo;s New</h3>
                    <Divider />
                    {categories.map((item) => (
                        <Link href={`/${item.toLowerCase()}`} key={item}>
                            <p>{item}</p>
                        </Link>
                    ))}
                </div>
                <div className={styles.col}>
                    <h3>Why we&lsquo;re cool</h3>
                    <Divider />
                    <Link href={'/about'}><p>About</p></Link>
                    <Link href={'/contact'}><p>Contact</p></Link>
                    <Link href={'/subscribe'}><p>Subscribe</p></Link>
                </div>
                <div className={styles.col}>
                    <h3>Coming Soon</h3>
                    <Divider />
                    <p>Jobs</p>
                </div>
            </div>
            <div id={styles['copy']}>
                    <div id={styles['copy-container']}>
                        <p>© {new Date().getFullYear()} Sachse Community Site</p>
                        <div>
                            All Rights Reserved
                             <> • </>
                            <Link href={'/privacy'}>Privacy Policy</Link>
                              <> • </>
                            <Link href={'/server-sitemap.xml'}>Sitemap</Link>
                        </div>
                    </div>
            </div>
        </footer>
    )
}

export default Footer;