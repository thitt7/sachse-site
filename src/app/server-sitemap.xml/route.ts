import { getServerSideSitemap } from 'next-sitemap';
import getAlerts from '@/lib/getAlerts';
import getNews from '@/lib/getNews';
import getEvents from '@/lib/getEvents';

export async function GET() {
  
  // let alerts = await getAlerts()
  let alerts = await (await fetch(`${process.env.API_URL}/api/alerts`)).json()
  alerts = alerts.map((alert: any) => {
    return {
      loc: `${process.env.SITE_URL}/alerts/${alert._id}`,
      lastmod: alert.createdAt,
      changefreq: "daily",
      priority: 0.7,
    }
  })
  // let news = await getNews()
  let news = await (await fetch(`${process.env.API_URL}/api/news`)).json()
  news = news.map((article: any) => {
    return {
      loc: `${process.env.SITE_URL}/news/${article.slug}`,
      lastmod: article.createdAt,
      changefreq: "daily",
      priority: 0.7,
    }
  })
  // let events = await getEvents()
  let events = await (await fetch(`${process.env.API_URL}/api/events`)).json()
  events = events.map((event: any) => {
    return {
      loc: `${process.env.SITE_URL}/events?id=${event._id}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    }
  })

  return getServerSideSitemap([
    {
      loc: `${process.env.SITE_URL}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    },
    {
      loc: `${process.env.SITE_URL}/alerts`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    },
    {
      loc: `${process.env.SITE_URL}/news`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    },
    {
      loc: `${process.env.SITE_URL}/events`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    },
    {
      loc: `${process.env.SITE_URL}/trash`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    },
    {
      loc: `${process.env.SITE_URL}/subscribe`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    },
    {
      loc: `${process.env.SITE_URL}/privacy`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    },
    ...alerts,
    ...news,
    ...events
  ])
}