import { ValidatedSteps } from "../../../views/Configuration";
import CustomizableButton from "../../common/Buttons/CustomizableButton";
import styles from "./ConfigurationLayout.module.css";

type ConfigurationLayoutProps = {
  children: React.ReactNode;
  step: number;
  prevStep: () => void;
  nextStep: () => void;
  validatedSteps: ValidatedSteps;
};

const ConfigurationLayout: React.FC<ConfigurationLayoutProps> = ({
  children,
  step,
  nextStep,
  prevStep,
  validatedSteps,
}) => {
  return (
    <main className={styles.main}>
      <div className={styles.background}>
        <div className={styles.designCardMain}>
          <div className={styles.designCardMainInner1}></div>
          <div className={styles.designCardMainInner2}></div>
        </div>
        <div className={styles.designCardTop}></div>
        <div className={styles.designCardBottom}>
          <div className={styles.designCardBottomInner}></div>
        </div>
      </div>
      <div className={styles.modal}>
        <div className={styles.content}>{children}</div>
        <div className={styles.footer}>
          <div className={styles.progressNumber}>
            {step + 1}
            <span> / 4</span>
          </div>
          <div className={styles.btnContainer}>
            {step > 0 && (
              <CustomizableButton onClick={prevStep} variant="opaque">
                Back
              </CustomizableButton>
            )}
            {step !== 3 && (
              <CustomizableButton
                disabled={!validatedSteps[step]}
                onClick={nextStep}
                variant="primary"
              >
                Next
              </CustomizableButton>
            )}
            {step === 3 && (
              <CustomizableButton
                disabled={!validatedSteps[step]}
                variant="primary"
                type={"submit"}
              >
                Create
              </CustomizableButton>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ConfigurationLayout;
