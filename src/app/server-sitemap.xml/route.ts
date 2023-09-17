import { getServerSideSitemap } from 'next-sitemap';
import getAlerts from '@/lib/getAlerts';
import getNews from '@/lib/getNews';
import getEvents from '@/lib/getEvents';

export async function GET(request: Request) {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  let alerts = await getAlerts()
  alerts = alerts.map((alert: any) => {
    return {
      loc: `${process.env.SITE_URL}/alerts/${alert._id}`,
      lastmod: alert.createdAt
    }
  })
  let news = await getNews()
  news = news.map((article: any) => {
    return {
      loc: `${process.env.SITE_URL}/news/${article.slug}`,
      lastmod: article.createdAt
    }
  })
  let events = await getEvents()
  events = events.map((event: any) => {
    return {
      loc: `${process.env.SITE_URL}/events?id=${event._id}`,
      lastmod: new Date().toISOString()
    }
  })

  return getServerSideSitemap([
    {
      loc: `${process.env.SITE_URL}`,
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: `${process.env.SITE_URL}/alerts`,
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: `${process.env.SITE_URL}/news`,
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: `${process.env.SITE_URL}/events`,
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: `${process.env.SITE_URL}/trash`,
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: `${process.env.SITE_URL}/subscribe`,
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: `${process.env.SITE_URL}/privacy`,
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    ...alerts,
    ...news,
    ...events
  ])
}