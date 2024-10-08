import { useNavigate } from "react-router-dom";
import CustomizableButton from "../../common/Buttons/CustomizableButton";
import StaticLogo from "../../common/Logos/StaticLogo";
import styles from "./LandingNavBar.module.css";

const LandingNavBar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <div className={styles.logoWrapper}>
          <StaticLogo />
        </div>
        <div className={styles.btnContainer}>
          <CustomizableButton
            onClick={() => navigate("/login")}
            variant="opaque"
            size="sm"
          >
            Log In
          </CustomizableButton>
          <CustomizableButton
            onClick={() => navigate("/signup")}
            variant="primary"
            size="sm"
          >
            Get Started
          </CustomizableButton>
        </div>
      </nav>
    </div>
  );
};

export default LandingNavBar;
