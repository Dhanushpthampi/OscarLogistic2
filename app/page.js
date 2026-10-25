import { getSiteContent } from "@/lib/content";
import ClientContentWrapper from "@/components/ClientContentWrapper";

export async function generateMetadata() {
  const content = await getSiteContent();
  const seo = content.seo || {};

  return {
    title: seo.title || "Oscar Logistics | Kerala Transport & Freight Logistics Solutions",
    description:
      seo.description ||
      "Leading goods transport and logistics company in Kerala. Dedicated Full Truck Load (FTL), Part Truck Load (PTL), Express Cargo, and Fleet Hire across all 14 Kerala districts.",
    keywords: seo.keywords || [
      "Kerala logistics company",
      "Kerala transport service",
      "truck rental Kerala",
      "express delivery Kerala",
      "goods transport Kochi",
    ],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.siteUrl || "https://www.oscarlogistics.in",
      siteName: content.company?.name || "Oscar Logistics",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function Home() {
  const content = await getSiteContent();

  const company = content.company || {};
  const faqs = content.faqs || [];

  // Schema 1: LocalBusiness & LogisticsService Schema
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "LogisticsService"],
    name: company.name || "Oscar Logistics",
    legalName: company.legalName || "Oscar Logistics India",
    url: content.seo?.siteUrl || "https://www.oscarlogistics.in",
    telephone: company.phonePrimary || "+918590411061",
    email: company.email || "oscarlogisticspvr@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Kerala",
      addressCountry: "IN",
      streetAddress: company.address || "NH 66 Bypass, Kerala",
    },
    description:
      content.seo?.description ||
      "Reliable Kerala goods transport, full truck load (FTL), part truck load (PTL), express freight delivery, and commercial vehicle rental across all 14 districts.",
    areaServed: {
      "@type": "State",
      name: "Kerala",
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "₹₹",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Logistics Services",
      itemListElement: (content.services || []).map((srv) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: srv.title,
          description: srv.shortDesc,
        },
      })),
    },
  };

  // Schema 2: FAQPage Schema for Rich Search Snippets in Google
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <ClientContentWrapper initialContent={content} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
