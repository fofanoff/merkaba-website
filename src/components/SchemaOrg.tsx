import type { Locale } from "@/lib/i18n";

const SITE_URL = "https://merkaba.vip";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Merkaba Digital",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Generative Engine Optimization (GEO) agency. AI visibility optimization for ChatGPT, Gemini, Perplexity, Claude",
  foundingDate: "2026",
  areaServed: "Worldwide",
  knowsLanguage: ["en", "ru", "tr", "ar"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@merkaba.vip",
    contactType: "sales",
  },
  sameAs: ["https://t.me/merkaba_digital"],
};

function buildBreadcrumbs(locale: string, path: string, label: string) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Merkaba Digital",
      item: `${SITE_URL}/${locale}`,
    },
  ];

  if (path) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: label,
      item: `${SITE_URL}/${locale}/${path}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

function buildFaqSchema(faq: { q: string; a: string }[]) {
  if (!faq || faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

function buildSpeakable(selectors: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: selectors,
    },
  };
}

function buildServiceSchemas() {
  const services = [
    {
      name: "LAUNCH - AI Visibility Audit",
      description:
        "One-time comprehensive AI visibility audit across 5 AI platforms with 100+ queries, competitive analysis, and 90-day action plan",
      offers: {
        "@type": "Offer",
        price: "5000",
        priceCurrency: "USD",
      },
    },
    {
      name: "GROWTH - Full GEO Optimization",
      description:
        "Monthly GEO optimization program including content engineering, structured data implementation, AI visibility dashboard, and strategy sessions. Minimum 6 months",
      offers: {
        "@type": "Offer",
        price: "8500",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "8500",
          priceCurrency: "USD",
          billingDuration: "P1M",
        },
      },
    },
    {
      name: "DOMINANCE - Premium GEO Program",
      description:
        "Premium monthly GEO program with AI-first content production, multi-platform optimization, dedicated strategist, and 24/7 priority support. Minimum 12 months",
      offers: {
        "@type": "Offer",
        price: "15000",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "15000",
          priceCurrency: "USD",
          billingDuration: "P1M",
        },
      },
    },
  ];

  return services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    provider: { "@type": "Organization", name: "Merkaba Digital" },
    ...s,
  }));
}

function buildArticleSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Construction company on Mediterranean coast of Turkey - GEO case study",
    description:
      "How a developer with 30 years of history became visible to AI in 4 months. AI Visibility Score from 5% to 47%",
    author: { "@type": "Organization", name: "Merkaba Digital" },
    publisher: {
      "@type": "Organization",
      name: "Merkaba Digital",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    datePublished: "2026-03-01",
    dateModified: "2026-04-10",
  };
}

function buildReviewSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Organization", name: "Merkaba Digital" },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    author: { "@type": "Person", name: "Director of Business Development" },
    reviewBody:
      "Merkaba Digital didn't just show us the problem - they solved it systematically. In 4 months, our brand became the first thing AI recommends in our region",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function JsonLd({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SchemaOrgHome({
  locale,
  dict,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}) {
  const faqData = dict.hero?.faq;
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={buildBreadcrumbs(locale, "", "Home")} />
      <JsonLd data={buildSpeakable([".hero-description", ".page-intro"])} />
      {faqData && <JsonLd data={buildFaqSchema(faqData)} />}
    </>
  );
}

export function SchemaOrgServices({
  locale,
  dict,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}) {
  const faqData = dict.services?.faq;
  const serviceSchemas = buildServiceSchemas();
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd
        data={buildBreadcrumbs(locale, "services", dict.nav.services)}
      />
      <JsonLd data={buildSpeakable([".hero-description", ".page-intro"])} />
      {serviceSchemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      {faqData && <JsonLd data={buildFaqSchema(faqData)} />}
    </>
  );
}

export function SchemaOrgCases({
  locale,
  dict,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}) {
  const faqData = dict.cases?.faq;
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={buildBreadcrumbs(locale, "cases", dict.nav.cases)} />
      <JsonLd data={buildSpeakable([".hero-description", ".page-intro"])} />
      <JsonLd data={buildArticleSchema()} />
      <JsonLd data={buildReviewSchema()} />
      {faqData && <JsonLd data={buildFaqSchema(faqData)} />}
    </>
  );
}

function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Costa",
    jobTitle: "Founder & GEO Strategist",
    worksFor: {
      "@type": "Organization",
      name: "Merkaba Digital",
      url: "https://merkaba.vip",
    },
    knowsAbout: [
      "Generative Engine Optimization",
      "SEO",
      "AI Visibility",
      "Digital Strategy",
    ],
    description:
      "15+ years in digital strategy, SEO, and AI technologies",
  };
}

export function SchemaOrgAbout({
  locale,
  dict,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}) {
  const faqData = dict.about?.faq;
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={buildBreadcrumbs(locale, "about", dict.nav.about)} />
      <JsonLd data={buildSpeakable([".hero-description", ".page-intro"])} />
      <JsonLd data={buildPersonSchema()} />
      {faqData && <JsonLd data={buildFaqSchema(faqData)} />}
    </>
  );
}

export function SchemaOrgContact({
  locale,
  dict,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}) {
  const faqData = dict.contact?.faq;
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={buildBreadcrumbs(locale, "contact", dict.nav.contact)} />
      {faqData && <JsonLd data={buildFaqSchema(faqData)} />}
    </>
  );
}

export function SchemaOrgPartners({
  locale,
  dict,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}) {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd
        data={buildBreadcrumbs(locale, "partners", dict.nav.partners)}
      />
    </>
  );
}
