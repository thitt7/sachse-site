/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://sachse.city',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  // sitemapSize: 7000,
  exclude: ['/server-sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://sachse.city/server-sitemap.xml', // <==== Add here
    ],
  },
  // ...other options
}