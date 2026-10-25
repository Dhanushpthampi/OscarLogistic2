import "./globals.css";

const siteUrl = "https://www.oscarlogistics.in";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Oscar Logistics | Kerala Transport & Freight Logistics Solutions",
    template: "%s | Oscar Logistics",
  },
  description:
    "Leading goods transport and logistics company in Kerala. Dedicated Full Truck Load (FTL), Part Truck Load (PTL), Express Cargo, and Fleet Hire across all 14 Kerala districts.",
  keywords: [
    "Kerala logistics company",
    "Kerala transport service",
    "truck rental Kerala",
    "express delivery Kerala",
    "goods transport Kochi",
    "goods carrier Trivandrum",
    "FTL transport Kozhikode",
    "Tata Intra hire Kerala",
    "Ashok Leyland Dosth rental Kerala",
    "inter district parcel Kerala",
    "Oscar Logistics",
  ],
  authors: [{ name: "Oscar Logistics" }],
  creator: "Oscar Logistics",
  publisher: "Oscar Logistics",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Oscar Logistics",
    title: "Oscar Logistics | Kerala Transport & Freight Logistics Solutions",
    description:
      "Reliable Kerala goods transport, full truck load (FTL), part truck load (PTL), express freight delivery, and commercial vehicle rental across all 14 districts.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oscar Logistics | Kerala Transport & Freight Logistics Solutions",
    description: "Reliable goods transport across all 14 districts of Kerala.",
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
  },
};

export const viewport = {
  themeColor: "#071120",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
