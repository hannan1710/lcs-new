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
  const siteUrl = 'https://lacoiffuresalons.in';
  const defaultImage = `${siteUrl}/lcsg.png`;
  
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Premium Hair & Beauty Services in Thane & Powai`;
  const fullDescription = description || 'La Coiffure Salon offers premium hair styling, beauty treatments, and wellness services in Thane and Powai. Expert stylists, modern techniques, and luxury experience.';
  const fullKeywords = keywords || 'hair salon thane, beauty salon powai, hair styling thane, beauty treatments powai, hair cut thane, hair color powai, facial thane, spa powai, manicure thane, pedicure powai, hair highlights thane, hair straightening powai, wedding makeup thane, bridal hair powai, lcs salon, la coiffure salon';
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
      
      {/* Instagram */}
      <meta property="instagram:card" content="summary_large_image" />
      <meta property="instagram:url" content={fullCanonicalUrl} />
      <meta property="instagram:title" content={fullTitle} />
      <meta property="instagram:description" content={fullDescription} />
      <meta property="instagram:image" content={fullOgImage} />
      
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
