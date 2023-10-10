'use client';

import React from 'react';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import styles from '../../styles/contact.module.scss';

const Client = () => {
  return (
    <div className={styles.flex}>
        <Link href={'tel:214-395-5037'} target='_blank'>
            <Paper elevation={15} id={styles['contactPaper']}>
                <PhoneIcon />
                <h3>Phone</h3>
            </Paper>
        </Link>
        <Link href={'mailto:tristan@hitt.dev'} target='_blank'>
            <Paper elevation={15} id={styles['contactPaper']}>
                <EmailIcon />
                <h3>Email</h3>
            </Paper>
        </Link>
        <Link href={'https://www.linkedin.com/in/tristan-hitt/'} target='_blank'>
            <Paper elevation={15} id={styles['contactPaper']}>
                <LinkedInIcon />
                <h3>Linkedin</h3>
            </Paper>
        </Link>
        <Link href={'https://github.com/thitt7/sachse-site'} target='_blank'>
            <Paper elevation={15} id={styles['contactPaper']}>
                <GitHubIcon />
                <h3>Github</h3>
            </Paper>
        </Link>
    </div>
  )
}

export default Client;