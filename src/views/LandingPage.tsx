import FaqSection from "../components/landingpage/FaqSection/FaqSection";
import HeroSection from "../components/landingpage/HeroSection/HeroSection";
import LandingNavBar from "../components/landingpage/LandingNavBar/LandingNavBar";
import OptionsSection from "../components/landingpage/OptionsSection/OptionsSection";
import PromptSection from "../components/landingpage/PromptSection/PromptSection";
import { API_ADDRESS } from "../config";

const LandingPage = () => {
  console.log(API_ADDRESS);
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
