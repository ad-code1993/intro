import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/private', '/_next', '/api'],
    },
    sitemap: 'https://intro-steel-sigma.vercel.app//sitemap.xml',
  }
}
