import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  structuredData,
  noIndex = false
}) => {
  const siteName = 'La Coiffure Salon';
  const siteUrl = 'https://lacoiffuresalons.com';
  const defaultImage = `${siteUrl}/la-coiffure-salon-logo.png`;

  // ✅ Optimized title & description
  const fullTitle = title
    ? `${title} | ${siteName}`
    : `${siteName} - Best Salon in Powai & Thane for Hair, Beauty & Bridal Services`;

  const fullDescription = description ||
    'La Coiffure Salon in Powai & Thane offers premium hair styling, keratin, botox, bridal makeup, facials, nails & spa. Luxury salon experience by expert stylists.';

  // ✅ Refined SEO keywords (no stuffing, covers core + location)
  const fullKeywords = keywords || `
    La Coiffure Salon, LCS Salon,
    best salon in Powai, best salon in Thane,
    hair salon Powai, hair salon Thane,
    beauty salon Powai, beauty salon Thane,
    luxury salon Powai, luxury salon Thane,
    keratin treatment Powai, keratin treatment Thane,
    hair botox salon Powai, hair botox salon Thane,
    bridal makeup Powai, bridal makeup Thane,
    haircut salon Powai, haircut salon Thane,
    hair colour salon Powai, hair colour salon Thane,
    balayage Powai, balayage Thane,
    nail extensions Powai, nail extensions Thane,
    manicure salon Powai, pedicure salon Thane,
    facials Powai, facials Thane,
    waxing salon Powai, waxing salon Thane,
    men’s grooming Powai, men’s grooming Thane,
    Jean Claude Biguine Powai,
  Looks Salon Powai,Lakme Salon Thane,Truefitt & Hill Powai, 
  estique salon thane, enrich salon, envi salon 
  `;

  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const fullOgImage = ogImage || defaultImage;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} /> */}

      {/* ✅ Removed Instagram tags (not used by Instagram SEO) */}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
