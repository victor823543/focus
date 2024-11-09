import {
  ArrowDownCircleIcon,
  ArrowUpOnSquareIcon,
  LockClosedIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import ReloadSvg from "../../../assets/svgs/ReloadSvg";
import SidebarSvg from "../../../assets/svgs/SidebarSvg";
import styles from "./ScreenDisplay.module.css";

type ScreenDisplayProps = {
  width?: string;
  content: React.ReactNode;
  variant?: "desktop" | "phone";
};

const ScreenDisplay: React.FC<ScreenDisplayProps> = ({
  width = "70vw",
  content,
  variant = "desktop",
}) => {
  if (variant === "desktop") {
    return (
      <div style={{ width }} className={styles.screenDisplay}>
        <div className={styles.screen}>
          <header className={styles.header}>
            <div className={styles.iconWrapper}>
              <div className={styles.dots}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
              <div className={styles.mdIcon}>
                <SidebarSvg />
              </div>
            </div>
            <div className={styles.search}>
              <div className={styles.searchTextContainer}>
                <div className={styles.smIcon}>
                  <LockClosedIcon />
                </div>
                <p className={styles.searchText}>focus.com</p>
              </div>
              <div className={styles.reloadIcon}>
                <ReloadSvg />
              </div>
            </div>
            <div className={styles.iconWrapper}>
              <ArrowDownCircleIcon width="1rem" />
              <ArrowUpOnSquareIcon width="1rem" />
              <PlusIcon width="1rem" />
            </div>
          </header>
          <div className={styles.content}>{content}</div>
        </div>
      </div>
    );
  }
  if (variant === "phone") {
    return (
      <div
        style={{ width }}
        className={`${styles.screenDisplay} ${styles.phone}`}
      >
        <div className={styles.screen}>
          <header className={styles.header}>
            <div className={styles.search}>
              <div className={styles.searchTextContainer}>
                <div className={styles.smIcon}>
                  <LockClosedIcon />
                </div>
                <p className={styles.searchText}>focus.com</p>
              </div>
              <div className={styles.reloadIcon}>
                <ReloadSvg />
              </div>
            </div>
          </header>
          <div className={styles.content}>{content}</div>
        </div>
      </div>
    );
  }
};

export default ScreenDisplay;
