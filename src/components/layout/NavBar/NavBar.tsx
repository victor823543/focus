import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";
import styles from "./NavBar.module.css";

type NavBarProps = {
  setSidebarOpen: (bool: boolean) => void;
};

const NavBar: React.FC<NavBarProps> = ({ setSidebarOpen }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.iconWrapper} onClick={() => setSidebarOpen(true)}>
        <Bars3Icon />
      </div>
    </nav>
  );
};

export default NavBar;
