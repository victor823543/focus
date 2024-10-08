import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { createRecordFromRange } from "../../../utils/functions";
import styles from "./FaqAccordion.module.css";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>(
    createRecordFromRange(0, items.length - 1),
  );

  return (
    <div className={styles.accordion}>
      {items.map(({ question, answer }, index) => (
        <div
          key={index}
          className={styles.item}
          onClick={() =>
            setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }))
          }
        >
          <div className={styles.questionContainer}>
            <p className={styles.question}>{question}</p>
            <div className={styles.icon}>
              {openItems[index] ? <MinusIcon /> : <PlusIcon />}
            </div>
          </div>
          <div
            className={styles.answerContainer}
            style={
              openItems[index] ? { display: "block" } : { display: "none" }
            }
          >
            <p className={styles.answer}>{answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
