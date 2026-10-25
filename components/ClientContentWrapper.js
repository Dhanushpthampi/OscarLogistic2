"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import HeroSection from "@/sections/HeroSection";
import StatsSection from "@/sections/StatsSection";
import ServicesSection from "@/sections/ServicesSection";
import FleetSection from "@/sections/FleetSection";
import CoverageSection from "@/sections/CoverageSection";
import WhyUsSection from "@/sections/WhyUsSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import FaqSection from "@/sections/FaqSection";
import ContactSection from "@/sections/ContactSection";

export default function ClientContentWrapper({ initialContent }) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    try {
      const override = localStorage.getItem("oscar_site_content_override");
      if (override) {
        const parsed = JSON.parse(override);
        setContent((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.warn("Could not parse content override:", e);
    }
  }, []);

  return (
    <>
      <Header content={content} />
      <main>
        <HeroSection content={content} />
        <StatsSection content={content} />
        <ServicesSection content={content} />
        <FleetSection content={content} />
        <CoverageSection content={content} />
        <WhyUsSection content={content} />
        <TestimonialsSection content={content} />
        <FaqSection content={content} />
        <ContactSection content={content} />
      </main>
      <Footer content={content} />
      <FloatingContact content={content} />
    </>
  );
}
