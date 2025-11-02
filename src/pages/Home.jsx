import { useSearchParams } from "react-router-dom";
import Hero from "../components/Hero"
import CTASection from "../sections/CtaSection";
import FeaturesSection from '../sections/FeaturesSection'
import PricingSection from "../sections/PricingSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import WhyChooseUs from "../sections/WhyChooseUs";
import HowItWorks from './../sections/HowItWorks';
import { useEffect } from "react";
const Home = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const section = searchParams.get("scroll");
    if (section) {
      const el = document.getElementById(section);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        });
      }
    }
  }, [searchParams]);
  
  return (
    <div>
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <WhyChooseUs />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </div>
  )
}

export default Home
