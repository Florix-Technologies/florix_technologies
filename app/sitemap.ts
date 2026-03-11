import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
        ? "https://florixtechnologies.com"
        : "http://localhost:3000";

    const routes = [
        { path: '', priority: 1, changeFrequency: 'weekly' as const },
        { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
        { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/request-quote', priority: 0.8, changeFrequency: 'weekly' as const },
        // Main services
        { path: '/services/web-development', priority: 0.85, changeFrequency: 'weekly' as const },
        { path: '/services/it-support', priority: 0.85, changeFrequency: 'weekly' as const },
        { path: '/services/it-consulting', priority: 0.85, changeFrequency: 'weekly' as const },
        { path: '/services/artificial-intelligence', priority: 0.85, changeFrequency: 'weekly' as const },
        { path: '/services/cloud', priority: 0.85, changeFrequency: 'weekly' as const },
        { path: '/services/amc-services', priority: 0.85, changeFrequency: 'weekly' as const },
        { path: '/services/amc-plans', priority: 0.85, changeFrequency: 'weekly' as const },
        { path: '/services/pc-building', priority: 0.85, changeFrequency: 'weekly' as const },
        { path: '/services/office-networking', priority: 0.85, changeFrequency: 'weekly' as const },
        // Legal pages
        { path: '/privacy-policy', priority: 0.5, changeFrequency: 'yearly' as const },
        { path: '/terms-of-service', priority: 0.5, changeFrequency: 'yearly' as const },
    ]

    return routes.map(({ path, priority, changeFrequency }) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
    }))
}
