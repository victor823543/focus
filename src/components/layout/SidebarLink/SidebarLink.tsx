import React from "react";
import { Link } from "react-router-dom";
import { LinkItem } from "../Sidebars/Sidebars";
import styles from "./SidebarLink.module.css";

type SidebarLinkProps = {
  content: LinkItem;
  selected: boolean;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({ content, selected }) => {
  return (
    <Link
      to={content.href}
      className={`${styles.link} ${selected ? styles.selected : ""}`}
    >
      <div className={styles.iconWrapper}>
        <content.Icon />
      </div>
      <span>{content.title}</span>
    </Link>
  );
};

export default SidebarLink;
