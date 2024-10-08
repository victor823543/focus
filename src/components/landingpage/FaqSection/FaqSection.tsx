import { Header } from "../../common/Headers/Headers";
import FaqAccordion from "../FaqAccordion/FaqAccordion";
import styles from "./FaqSection.module.css";

const FaqSection = () => {
  return (
    <div className={styles.faqSection}>
      <Header variant="landing" center className={styles.header}>
        Frequently Asked <span className={styles.highlight}>Questions</span>
      </Header>
      <div className={styles.accordionWrapper}>
        <FaqAccordion items={faqItems} />
      </div>
    </div>
  );
};

const faqItems = [
  {
    question: "Is the service for free?",
    answer: "Yes, it is completely for free to use how much you like!",
  },
  {
    question: "Is the service for free?",
    answer: "Yes, it is completely for free to use how much you like!",
  },
  {
    question: "Is the service for free?",
    answer: "Yes, it is completely for free to use how much you like!",
  },
  {
    question: "Is the service for free?",
    answer: "Yes, it is completely for free to use how much you like!",
  },
  {
    question: "Is the service for free?",
    answer: "Yes, it is completely for free to use how much you like!",
  },
];

export default FaqSection;
