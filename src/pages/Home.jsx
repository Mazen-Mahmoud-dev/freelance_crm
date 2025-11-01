import Hero from "../components/Hero"
import CTASection from "../sections/CtaSection";
import FeaturesSection from '../sections/FeaturesSection'
import PricingSection from "../sections/PricingSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import WhyChooseUs from "../sections/WhyChooseUs";
import HowItWorks from './../sections/HowItWorks';
const Home = () => {
  
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
