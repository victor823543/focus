import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import useSlideShowScrollTo from "../../../hooks/useSlideShowScrollTo";
import styles from "./SlideShow.module.css";

interface SlideShowProps {
  content: React.FC<SlideShowContentProps>[];
}

const SlideShow: React.FC<SlideShowProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLUListElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });
  const scrollToItem = useSlideShowScrollTo(containerRef);

  return (
    <main className={styles.slideShow}>
      <div
        className={`hideScrollbar ${styles.scrollContainer}`}
        ref={containerRef}
      >
        <ul ref={elementRef} className={styles.cards}>
          {content.map((Item, index) => (
            <li className={styles.card} key={index}>
              <Item
                progress={scrollXProgress}
                index={index}
                length={content.length}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.stickyContainer}>
        <ProgressDisplay
          length={content.length}
          progress={scrollXProgress}
          scrollToItem={scrollToItem}
        />
      </div>
    </main>
  );
};

export default SlideShow;

interface ProgressDisplayProps {
  length: number;
  progress: MotionValue<number>;
  scrollToItem: (index: number) => void;
}

const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
  length,
  progress,
  scrollToItem,
}) => {
  return (
    <div className={styles.progressDisplay}>
      <div className={styles.progressWrapper}>
        {Array.from({ length: length }, (_, i) => i).map((index) => {
          return (
            <ProgressDisplayItem
              key={index}
              length={length}
              progress={progress}
              index={index}
              scrollToItem={scrollToItem}
            />
          );
        })}
      </div>
    </div>
  );
};

interface ProgressDisplayItemProps extends ProgressDisplayProps {
  index: number;
}

const ProgressDisplayItem: React.FC<ProgressDisplayItemProps> = ({
  length,
  progress,
  index,
  scrollToItem,
}) => {
  const center = index / (length - 1);
  const formerCenter = (index - 1) / (length - 1);
  const nextCenter = (index + 1) / (length - 1);

  const inputRange =
    center === 0
      ? [center, nextCenter]
      : center === 1
        ? [formerCenter, center]
        : [formerCenter, center, nextCenter];

  const outputRange =
    center === 0
      ? ["40px", "10px"]
      : center === 1
        ? ["10px", "40px"]
        : ["10px", "40px", "10px"];

  const width = useTransform(progress, inputRange, outputRange);

  return (
    <motion.div
      className={styles.progressItem}
      onClick={() => scrollToItem(index)}
      style={{ width }}
    ></motion.div>
  );
};

interface CreateSlideShowContentProps {
  text: string;
  color: string;
  content: React.ReactNode;
}

export interface SlideShowContentProps {
  progress: MotionValue<number>;
  index: number;
  length: number;
}

export const createSlideShowContent =
  ({
    text,
    color,
    content,
  }: CreateSlideShowContentProps): React.FC<SlideShowContentProps> =>
  ({ progress, index, length }) => {
    const center = index / (length - 1);
    const distance = parseFloat((1 / (length * 2)).toFixed(2));

    const start = center - distance;
    const end = center + distance;

    const inputRange =
      center === 0
        ? [center, end]
        : center === 1
          ? [start, center]
          : [start, center, end];

    const opacityOutputRange =
      center === 0 ? [1, 0] : center === 1 ? [0, 1] : [0, 1, 0];
    const xOutputRange =
      center === 0 ? [1, -300] : center === 1 ? [300, 1] : [300, 1, -300];

    const opacity = useTransform(progress, inputRange, opacityOutputRange);
    const x = useTransform(progress, inputRange, xOutputRange);

    return (
      <div className={styles.itemWrapper}>
        <div className={styles.textContainer}>
          <motion.p className={styles.p} style={{ opacity, x, color }}>
            {text}
          </motion.p>
        </div>
        <div className={styles.content}>{content}</div>
      </div>
    );
  };
