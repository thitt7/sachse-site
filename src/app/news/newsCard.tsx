'use client';

import React from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import slugify from "slugify";

import '../../styles/alerts.module.scss';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type Props = {
    news: any;
    i: number;
}

const NewsCard: React.FC<Props> = ({news, i}: Props) => {
    const router = useRouter()
    
    return (
        <>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} >
                            {news.author[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={news.title}
                    subheader={new Date(news.createdAt).toLocaleString()}
                />
                <CardMedia
                    component="img"
                    image={news.img.src}
                    alt={news.img.alt}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: news.body.html }}>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Link href={`/news/${slugify(news.title, {lower: true})}`}>
                        <Button size="small">Read More</Button>
                    </Link>
                </CardActions>
            </Card>
        </>
    )

}

export default NewsCard;