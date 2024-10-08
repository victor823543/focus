import FaqSection from "../components/landingpage/FaqSection/FaqSection";
import HeroSection from "../components/landingpage/HeroSection/HeroSection";
import LandingNavBar from "../components/landingpage/LandingNavBar/LandingNavBar";
import OptionsSection from "../components/landingpage/OptionsSection/OptionsSection";
import PromptSection from "../components/landingpage/PromptSection/PromptSection";

const LandingPage = () => {
  return (
    <>
      <LandingNavBar />
      <HeroSection />
      <OptionsSection />
      <FaqSection />
      <PromptSection />
    </>
  );
};

export default LandingPage;
