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
    question: "What is its purpose?",
    answer:
      "The purpose of this service is to help you keep track of your daily achievements and progress, and thereby help you stay focused on your goals and give you that extra motivation to become your best self.",
  },
  {
    question: "What is a category?",
    answer:
      "A category is a way to define the things you want to improve on. It can be however specific or general you want it to be. For example, you can have a category called 'Health' or 'Productivity'. You can also have a category called 'Running' or 'Reading'. It is then up to you to decide what constitutes a 'success' in that category.",
  },
  {
    question: "What is importance?",
    answer:
      "When you decide different areas you would like to focus on may not feel that they are all equally important. The importance value is a way to give a weight to each category, which makes your score and stats more accurately reflect reality.",
  },
  {
    question: "What is a session?",
    answer:
      "A session is a way to group your data and stats together. You can have multiple sessions, for example, one for work and one for personal life. Or you may feel that the categories in one session are outdated and want to start fresh.",
  },
];

export default FaqSection;
