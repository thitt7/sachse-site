'use client';

import React, {useState} from 'react'
import readingTime from '@/lib/readingTime';
import Avatar from '@mui/material/Avatar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ArticleInfo = ({article}: any) => {

const Article = article[0];

const getTimeElapsed = () => {
  const millisecondsinday = 86400000;
  const days = (Date.now() - new Date(Article.createdAt).getTime()) / millisecondsinday
  const daysElapsed = Math.round(days)
  const hoursElapsed = Math.round(days * 24)
  const formattedDate = new Date(Article.createdAt).toDateString().slice(3)
  
  let timeElapsed;
  if (daysElapsed < 29) {
    if (daysElapsed < 1) {timeElapsed = `${hoursElapsed} hour${hoursElapsed > 1 ? 's' : ''} ago`}
    else {timeElapsed = `${daysElapsed} day${daysElapsed > 1 ? 's' : ''} ago`}
  }
  else {timeElapsed = formattedDate}
  return timeElapsed;
}

const timeIcon = <AccessTimeIcon sx={{fontSize: '1rem'}}/>
const calendarIcon = <CalendarTodayIcon sx={{fontSize: '1rem'}}/>
  return (
    <div className="article-info">
        <Avatar>{Article.author[0]}</Avatar>
        <div>
            <h3 className='author'>{Article.author}</h3>
            <span>{timeIcon}{`${readingTime(Article.body)} min read`}<div>·</div>{calendarIcon}{getTimeElapsed()}</span>
        </div>
    </div>
  )
}

export default ArticleInfo;