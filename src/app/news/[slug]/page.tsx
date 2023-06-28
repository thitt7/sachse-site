import React from 'react'
import getArticle from "@/lib/getArticle";

import ArticleInfo from './articleInfo';

const NewsArticle = async ({ params }: { params: { slug: string } }) => {
  const article = await getArticle(params.slug);

const {URL, title, author, body, category, createdAt, img} = article[0];

  return (
    <div className='article-content'>
      <h1>{title}</h1>
      <ArticleInfo article={article}/>
      <img src={img} alt="" />
      <div dangerouslySetInnerHTML={{ __html: body }}/>
    </div>
  )
}

export default NewsArticle;
