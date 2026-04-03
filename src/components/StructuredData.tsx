import React from 'react';

const StructuredData = () => {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Beavers Tree Service & Landscaping Inc.",
    "alternateName": "Beavers Tree Service",
    "image": "https://beavers-tree-service.vercel.app/showcase.jpg",
    "logo": "https://beavers-tree-service.vercel.app/Logo.png",
    "@id": "https://beavers-tree-service.vercel.app",
    "url": "https://beavers-tree-service.vercel.app",
    "telephone": "919-358-2168",
    "email": "beaverstreeservicenc@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Raleigh",
      "addressRegion": "NC",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.7796,
      "longitude": -78.6382
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.google.com/search?q=Beavers+Tree+Service+Raleigh+NC+reviews"
    ],
    "priceRange": "$$",
    "areaServed": [
      {
        "@type": "City",
        "name": "Raleigh"
      },
      {
        "@type": "City",
        "name": "Cary"
      },
      {
        "@type": "City",
        "name": "Apex"
      },
      {
        "@type": "City",
        "name": "Durham"
      },
      {
        "@type": "City",
        "name": "Clayton"
      },
      {
        "@type": "City",
        "name": "Chapel Hill"
      },
      {
        "@type": "City",
        "name": "Garner"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Tree and Landscaping Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tree Removal"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tree Trimming"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Emergency Tree Service"
          }
        },
        {
           "@type": "Offer",
           "itemOffered": {
             "@type": "Service",
             "name": "Stump Grinding"
           }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
    />
  );
};

export default StructuredData;
