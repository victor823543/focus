import exercise from "../../../assets/images/exercise.jpg";
import healthyFood from "../../../assets/images/healthy-food.jpg";
import sleep from "../../../assets/images/sleep.jpg";
import study from "../../../assets/images/study.jpg";
import { Header } from "../../common/Headers/Headers";
import { Paragraph } from "../../common/Paragraphs/Paragraphs";
import SlideShow, { createSlideShowContent } from "../SlideShow/SlideShow";
import styles from "./OptionsSection.module.css";

const OptionsSection = () => {
  return (
    <div className={styles.optionsSection}>
      <div className={styles.textWrapper}>
        <Header variant="landing" center>
          Choose Your Goals <span className={styles.highlight}>Freely</span>
        </Header>
        <Paragraph center className={styles.p}>
          Define your target areas however you wish. You decide what you want to{" "}
          <span className={styles.highlight}>Focus</span> on for the time being.
        </Paragraph>
      </div>
      <div className={styles.slideShowWrapper}>
        <SlideShow content={slideShowContent} />
      </div>
    </div>
  );
};

export default OptionsSection;

const SlideShowContentExercise = createSlideShowContent({
  text: "Whether its getting in shape and improving health by exercise...",
  color: "#ffffff",
  content: <img src={exercise} alt="exercise image" className={styles.img} />,
});

const SlideShowContentFood = createSlideShowContent({
  text: "...or eating your veggies and protein.",
  color: "#ffffff",
  content: (
    <img src={healthyFood} alt="healthy food image" className={styles.img} />
  ),
});

const SlideShowContentStudy = createSlideShowContent({
  text: "Whether its working for that promotion or studying for the bar...",
  color: "#ffffff",
  content: <img src={study} alt="study image" className={styles.img} />,
});

const SlideShowContentSleep = createSlideShowContent({
  text: "...or waking up early in the mornings. Its all up to you!",
  color: "#000000",
  content: <img src={sleep} alt="sleep image" className={styles.img} />,
});

const slideShowContent = [
  SlideShowContentExercise,
  SlideShowContentFood,
  SlideShowContentStudy,
  SlideShowContentSleep,
];
