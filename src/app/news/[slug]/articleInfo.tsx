'use client';

import React, {useState} from 'react'
import readingTime from '@/lib/readingTime';
import Avatar from '@mui/material/Avatar';

const ArticleInfo = ({article}: any) => {

const millisecondsinday = 86400000;
const Article = article[0];
const [daysElapsed, setDaysElapsed] = useState(Math.round((Date.now() - new Date(Article.createdAt).getTime()) / millisecondsinday));
const formattedDate = new Date(Article.createdAt).toDateString().slice(3)
  return (
    <div className="article-info">
        <Avatar>{Article.author[0]}</Avatar>
        <div>
            <h3 className='author'>{Article.author}</h3>
            <span>{`${readingTime(Article.body)} min read`} · {daysElapsed < 29 ? `${daysElapsed} days ago`: formattedDate}</span>
        </div>
    </div>
  )
}

export default ArticleInfo;