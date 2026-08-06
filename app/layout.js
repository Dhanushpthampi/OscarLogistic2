import "./globals.css";

const siteUrl = "https://www.oscarlogistics.in";
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Oscar Logistics | Kerala Transport & Logistics Solutions", template: "%s | Oscar Logistics" },
  description: "Reliable Kerala transport, full truck load, part truck load, express delivery, and warehousing by Oscar Logistics.",
  keywords: ["Kerala logistics", "Kerala transport", "truck rental Kerala", "express delivery Kerala", "Oscar Logistics"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_IN", url: siteUrl, siteName: "Oscar Logistics", title: "Oscar Logistics | Kerala Transport & Logistics Solutions", description: "Delivering trust across Kerala with dependable transport and logistics solutions." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) { return <html lang="en"><body>{children}</body></html>; }
