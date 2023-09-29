import React from 'react'
import Client from './client'

import getNews from '@/lib/getNews'

const News = async () => {

  const news = await getNews(undefined, 5, 0)

  return (
    <Client news={news} />
  )
}

export default News