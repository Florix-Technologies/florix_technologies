import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
        ? "https://florixtechnologies.com"
        : "http://localhost:3000";

    const routes = [
        '',
        '/about',
        '/services',
        '/contact',
        '/request-quote',
        '/services/web-development',
        '/services/it-support',
        '/services/it-consulting',
        '/services/artificial-intelligence',
        '/services/amc-services',
        '/services/pc-building',
        '/services/office-networking',
        '/privacy-policy',
        '/terms-of-service',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }))
}
