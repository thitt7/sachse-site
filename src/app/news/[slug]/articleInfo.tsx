'use client';

import React, {useState} from 'react'
import readingTime from '@/lib/readingTime';
import Avatar from '@mui/material/Avatar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ArticleInfo = ({article}: any) => {

const Article = article[0];
const millisecondsinday = 86400000;
const [daysElapsed, setDaysElapsed] = useState(Math.round((Date.now() - new Date(Article.createdAt).getTime()) / millisecondsinday));
const formattedDate = new Date(Article.createdAt).toDateString().slice(3)

const timeIcon = <AccessTimeIcon sx={{fontSize: '1rem'}}/>
const calendarIcon = <CalendarTodayIcon sx={{fontSize: '1rem'}}/>
  return (
    <div className="article-info">
        <Avatar>{Article.author[0]}</Avatar>
        <div>
            <h3 className='author'>{Article.author}</h3>
            <span>{timeIcon}{`${readingTime(Article.body)} min read`}<div>·</div>{calendarIcon}{daysElapsed < 29 ? `${daysElapsed} day${daysElapsed > 1 ? 's' : ''} ago`: formattedDate}</span>
        </div>
    </div>
  )
}

export default ArticleInfo;