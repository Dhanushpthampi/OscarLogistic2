import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/sections/HeroSection";
import StatsSection from "@/sections/StatsSection";
import ServicesSection from "@/sections/ServicesSection";
import FleetSection from "@/sections/FleetSection";
import WhyUsSection from "@/sections/WhyUsSection";
import CoverageSection from "@/sections/CoverageSection";
import FaqSection from "@/sections/FaqSection";
import ContactSection from "@/sections/ContactSection";

const organizationSchema = { "@context": "https://schema.org", "@type": "LocalBusiness", name: "Oscar Logistics", url: "https://www.oscarlogistics.in", email: "oscarlogisticspvr@gmail.com", telephone: "+918590411061", description: "Kerala transportation and logistics solutions.", areaServed: { "@type": "State", name: "Kerala" }, openingHours: "Mo-Su 00:00-23:59", priceRange: "₹₹" };

export default function Home() { return <><Header /><main><HeroSection /><StatsSection /><ServicesSection /><FleetSection /><WhyUsSection /><CoverageSection /><FaqSection /><ContactSection /></main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} /></>; }
