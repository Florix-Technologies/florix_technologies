import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Preloader } from "@/components/preloader"
import GoogleAnalytics from "@/components/google-analytics"
import { StructuredData } from '@/components/structured-data'

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
}

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  ? "https://florixtechnologies.com"
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Florix Technologies | Advanced IT Solutions & PC Building",
    template: "%s | Florix Technologies",
  },
  description: "Florix Technologies provides comprehensive IT solutions including web development, IT support, AI integration, and custom PC building. Trusted by 91+ clients worldwide.",
  keywords: [
    "IT Solutions",
    "Web Development",
    "PC Building",
    "IT Support",
    "AI Integration",
    "Cloud Services",
    "Office Networking",
    "AMC Services",
    "Bangalore IT Company",
    "Bengaluru IT Services",
    "Florix Technologies",
    "Florix PC Station",
    "IT Consulting",
    "Custom PC Building",
    "24/7 Technical Support"
  ],
  authors: [{ name: "Florix Technologies" }],
  creator: "Florix Technologies",
  publisher: "Florix Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/Florix.png', sizes: 'any', type: 'image/png' },
      { url: '/Florixsvg.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/Florix.png' },
    ],
  },
  openGraph: {
    title: "Florix Technologies | Advanced IT Solutions & PC Building",
    description: "Transform your digital presence with cutting-edge web applications and high-performance hardware solutions. One-stop IT ecosystem.",
    url: baseUrl,
    siteName: "Florix Technologies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Florix.png",
        width: 1200,
        height: 630,
        alt: "Florix Technologies - Advanced IT Solutions & PC Building",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Florix Technologies | Advanced IT Solutions",
    description: "Transform your digital presence with cutting-edge web applications and high-performance hardware solutions.",
    images: ["/Florix.png"],
    creator: "@florixtech",
    site: "@florixtech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    "bingbot": {
      index: true,
      follow: true,
      "max-image-preview": "large"
    }
  },
  verification: {
    google: "google-site-verification-code-here",
    other: {
      "msvalidate.01": "bing-site-verification-code-here",
    }
  },
  alternates: {
    canonical: baseUrl,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Florix Technologies",
    "alternateName": "Florix PC Station",
    "image": `${baseUrl}/Florix.png`,
    "url": baseUrl,
    "telephone": "+919986639994",
    "email": "info@florixtechnologies.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "634, 8th Main Rd, Jeewan Griha Colony, 2nd Phase, J. P. Nagar",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560078",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9116,
      "longitude": 77.5878
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "22:00"
    },
    "sameAs": [
      "https://www.instagram.com/florix_technologies",
      // Add other social profiles here when available
    ]
  };

  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={`font-sans antialiased overflow-x-hidden`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Preloader />
        <Navbar />

        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
