'use client';

import React, { useLayoutEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";

import '../../styles/alerts.module.scss'
import styles from '../../styles/alerts.module.scss'
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

type Props = {
    alert?: any;
    i?: number;
}

const severity = (type: string) => {
    switch (type) {
        case 'Alert':
          return 'error'
        case 'Community':
            return 'info'
        case 'Advisory':
            return 'warning'
        default:
            return 'error'
      }
}

const AlertCard: React.FC<Props> = ({alert, i}: Props) => {
    const [cardHeight, setCardHeight] = useState<number>()
    const router = useRouter()

    useLayoutEffect(() => {
        const margin = 20;
        const body = document.querySelector('body')?.offsetHeight;
        const header = document.querySelector('header')?.offsetHeight;
        const computedHeight = body! - header! - (margin * 2);
        setCardHeight(computedHeight)
    }, []);
    
    return (
        <>
            <Card style={{maxHeight: `${cardHeight}px`}} key={i} className={styles.card} onClick={() => router.push(`/alerts/${alert._id}`)}>
            <Alert className={`${styles.type} ${alert.type.toLowerCase()}`} severity={severity(alert.type)}>{`Message Type: ${alert.type}`}</Alert>
                <CardContent className={`${styles.content}`}>
                    <h3>{alert.title}</h3>
                    <p className="date">{new Date(alert.createdAt).toLocaleString()}</p>
                    <p dangerouslySetInnerHTML={{ __html: alert.body }}></p>
                </CardContent>
                <Button size="small">Read More</Button>
            </Card>
        </>
    )

}

export default AlertCard