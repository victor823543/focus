import { useNavigate } from "react-router-dom";
import screenImg from "../../../assets/images/dashboard-new.png";
import screenImgPhone from "../../../assets/images/dashboard-phone-no-nav.png";
import useOverflowHeight from "../../../hooks/useOverflowHeight";
import CustomizableButton from "../../common/Buttons/CustomizableButton";
import { Header } from "../../common/Headers/Headers";
import { Paragraph } from "../../common/Paragraphs/Paragraphs";
import ScreenDisplay from "../ScreenDisplay/ScreenDisplay";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const { overflowMargin, sectionRef, screenRef } = useOverflowHeight();
  const navigate = useNavigate();
  return (
    <div
      className={styles.sectionContainer}
      style={{ marginBottom: `${overflowMargin}px` }}
      ref={sectionRef}
    >
      <main className={styles.heroSection}>
        <div className={styles.background}></div>
        <div className={styles.textWrapper}>
          <Header variant="landing" center className={styles.header}>
            Keep Your <span className={styles.highlight}>Focus</span> and Boost
            Productivity
          </Header>
          <Paragraph center className={styles.p}>
            We help you stay focused by providing a platform for keeping track
            of your daily achievements and progress.
          </Paragraph>
          <CustomizableButton onClick={() => navigate("/signup")}>
            Get started now
          </CustomizableButton>
        </div>
        <div ref={screenRef}>
          <div className={styles.screenContainer}>
            <ScreenDisplay
              content={<img className={styles.img} src={screenImg} />}
            />
          </div>
          <div className={styles.screenContainerPhone}>
            <ScreenDisplay
              content={<img className={styles.img} src={screenImgPhone} />}
              variant="phone"
              width="50vw"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;
