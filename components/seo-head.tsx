"use client";

import {
  getOrganizationSchema,
  getPersonSchema,
  getBreadcrumbSchema,
} from "@/lib/seo";

export function SEOHead() {
  const schemas = [
    getOrganizationSchema(),
    getPersonSchema(),
    getBreadcrumbSchema(),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          suppressHydrationWarning
        />
      ))}
    </>
  );
}
