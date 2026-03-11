export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Florix Technologies",
  "description": "Florix Technologies provides comprehensive IT solutions including web development, IT support, AI integration, and custom PC building.",
  "url": "https://florixtechnologies.com",
  "logo": "https://florixtechnologies.com/logo.png",
  "sameAs": [
    "https://www.facebook.com/florixtechnologies",
    "https://www.linkedin.com/company/florix-technologies",
    "https://twitter.com/florixtechnologies"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "JP Nagar",
    "addressLocality": "Bengaluru",
    "addressRegion": "Karnataka",
    "postalCode": "560078",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+91-XXXXXXXXXX",
    "email": "info@florixtechnologies.com",
    "availableLanguage": ["en"]
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Florix Technologies",
  "description": "Advanced IT Solutions & PC Building Company in Bengaluru",
  "image": "https://florixtechnologies.com/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "JP Nagar",
    "addressLocality": "Bengaluru",
    "addressRegion": "Karnataka",
    "postalCode": "560078",
    "addressCountry": "IN"
  },
  "telephone": "+91-XXXXXXXXXX",
  "email": "info@florixtechnologies.com",
  "url": "https://florixtechnologies.com",
  "areaServed": {
    "@type": "City",
    "name": "Bengaluru"
  },
  "priceRange": "₹₹",
  "ratingValue": "91",
  "reviewCount": "91",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "91",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export const servicesSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Web Development",
    "description": "Custom web development services using React, Next.js, and Node.js with responsive design and high performance.",
    "url": "https://florixtechnologies.com/services/web-development",
    "provider": {
      "@type": "Organization",
      "name": "Florix Technologies"
    },
    "areaServed": {
      "@type": "City",
      "name": "Bengaluru"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "IT Support Services",
    "description": "Comprehensive 24/7 IT support services with rapid response, proactive monitoring, and expert consultants.",
    "url": "https://florixtechnologies.com/services/it-support",
    "provider": {
      "@type": "Organization",
      "name": "Florix Technologies"
    },
    "areaServed": {
      "@type": "City",
      "name": "Bengaluru"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Cloud Services",
    "description": "Cloud adoption, migration, DevOps, security, and cost optimization for AWS, Azure, GCP, and hybrid clouds.",
    "url": "https://florixtechnologies.com/services/cloud",
    "provider": {
      "@type": "Organization",
      "name": "Florix Technologies"
    },
    "areaServed": {
      "@type": "City",
      "name": "Bengaluru"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom PC & Laptop Building",
    "description": "Custom PC and laptop building services optimized for gaming, rendering, and workstations.",
    "url": "https://florixtechnologies.com/services/pc-building",
    "provider": {
      "@type": "Organization",
      "name": "Florix Technologies"
    },
    "areaServed": {
      "@type": "City",
      "name": "Bengaluru"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "IT Consulting",
    "description": "Strategic IT consulting for digital transformation, technology roadmaps, and innovation.",
    "url": "https://florixtechnologies.com/services/it-consulting",
    "provider": {
      "@type": "Organization",
      "name": "Florix Technologies"
    },
    "areaServed": {
      "@type": "City",
      "name": "Bengaluru"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Integration & Machine Learning",
    "description": "AI integration, machine learning, and predictive analytics solutions for intelligent systems.",
    "url": "https://florixtechnologies.com/services/artificial-intelligence",
    "provider": {
      "@type": "Organization",
      "name": "Florix Technologies"
    },
    "areaServed": {
      "@type": "City",
      "name": "Bengaluru"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Office Networking Solutions",
    "description": "Enterprise office networking, network design, and infrastructure setup for secure, scalable, high-performance networks.",
    "url": "https://florixtechnologies.com/services/office-networking",
    "provider": {
      "@type": "Organization",
      "name": "Florix Technologies"
    },
    "areaServed": {
      "@type": "City",
      "name": "Bengaluru"
    }
  }
];

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};
