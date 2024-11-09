import { motion, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../../assets/images/exercise.jpg";
import img3 from "../../../assets/images/gym.jpg";
import img2 from "../../../assets/images/work.jpg";
import { useMousePosition } from "../../../hooks/useMousePosition";
import CustomizableButton from "../../common/Buttons/CustomizableButton";
import { Header } from "../../common/Headers/Headers";
import { Paragraph } from "../../common/Paragraphs/Paragraphs";
import styles from "./PromptSection.module.css";

const PromptSection = () => {
  const navigate = useNavigate();

  const { normalizedX, normalizedY } = useMousePosition();

  const xImg3 = useSpring(0, { damping: 30, stiffness: 100 });
  const yImg3 = useSpring(0, { damping: 30, stiffness: 100 });
  const xImg2 = useSpring(0, { damping: 30, stiffness: 100 });
  const yImg2 = useSpring(0, { damping: 30, stiffness: 100 });
  const xImg1 = useSpring(0, { damping: 30, stiffness: 100 });
  const yImg1 = useSpring(0, { damping: 30, stiffness: 100 });

  useEffect(() => {
    xImg3.set(normalizedX * -150);
    yImg3.set(normalizedY * -125);
    xImg2.set(normalizedX * -60);
    yImg2.set(normalizedY * -30);
    xImg1.set(normalizedX * -100);
    yImg1.set(normalizedY * -60);
  }, [normalizedX, normalizedY]);

  return (
    <div className={styles.promptSection}>
      <div className={styles.box}>
        <div className={styles.textWrapper}>
          <Header variant="landing" center style={{ color: "white" }}>
            Ready to put in <br /> the{" "}
            <span className={styles.highlight}>Work?</span>
          </Header>
          <Paragraph center className={styles.p}>
            Embark on your journey towards your goals, and let us help you keep
            your focus along the way. It's completely free!
          </Paragraph>
          <CustomizableButton
            onClick={() => navigate("/signup")}
            style={{ backgroundColor: "white", color: "var(--gray-x-dark)" }}
          >
            Get started now
          </CustomizableButton>
        </div>
        <div className={styles.imageWrapper}>
          <motion.img
            className={styles.img1}
            src={img1}
            alt="exercice image"
            style={{ y: yImg1, x: xImg1 }}
          />
          <motion.img
            className={styles.img2}
            src={img2}
            alt="work image"
            style={{ y: yImg2, x: xImg2 }}
          />
          <motion.img
            className={styles.img3}
            src={img3}
            alt="gym image"
            style={{ y: yImg3, x: xImg3 }}
          />
        </div>
      </div>
    </div>
  );
};

export default PromptSection;
