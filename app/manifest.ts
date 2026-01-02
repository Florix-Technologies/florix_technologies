import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Florix Technologies',
        short_name: 'Florix',
        description: 'Advanced IT Solutions & Custom PC Building',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#22c55e',
        icons: [
            {
                src: '/Florix.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/Florix.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
