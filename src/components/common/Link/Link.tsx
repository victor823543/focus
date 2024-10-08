import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styles from "./Link.module.css";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
};

const Link: React.FC<LinkProps> = ({ to, className, ...rest }) => {
  return (
    <RouterLink
      to={to}
      {...rest}
      className={`${styles.link} ${className}`}
    ></RouterLink>
  );
};

export default Link;
