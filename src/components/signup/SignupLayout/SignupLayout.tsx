import React from "react";
import styles from "./SignupLayout.module.css";

type SignupLayoutProps = {
  children: React.ReactNode;
};

const SignupLayout: React.FC<SignupLayoutProps> = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>{children}</div>
      <div className={styles.designContainerDesktop}>
        <div className={styles.designCardMain}>
          <div className={styles.designCardMainInner1}></div>
          <div className={styles.designCardMainInner2}></div>
        </div>
        <div className={styles.designCardTop}></div>
        <div className={styles.designCardBottom}>
          <div className={styles.designCardBottomInner}></div>
        </div>
      </div>
    </main>
  );
};

export default SignupLayout;
