'use client';

import React from 'react'
import readingTime from '@/lib/readingTime';
import Avatar from '@mui/material/Avatar';

const ArticleInfo = ({article}: any) => {

const Article = article[0];

  return (
    <div className="article-info">
        <Avatar>{Article.author[0]}</Avatar>
        <div>
            <h3 className='author'>{Article.author}</h3>
            <span>{`${readingTime(Article.body)} min read`} · {Article.createdAt}</span>
        </div>
    </div>
  )
}

export default ArticleInfo;