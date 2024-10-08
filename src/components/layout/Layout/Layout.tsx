import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Sidebar } from "../Sidebars/Sidebars";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
  name: string;
  padding?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, name, padding = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className={styles.layout}>
      <div className={styles.navbarWrapper}>
        <NavBar setSidebarOpen={setSidebarOpen} />
      </div>
      <div
        className={`${styles.sidebarWrapper} ${sidebarOpen ? styles.open : styles.closed}`}
      >
        <Sidebar
          selected={name}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {sidebarOpen && (
          <div
            className={styles.cover}
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </div>

      <main className={styles.main}>
        <div className={`${styles.content} ${padding ? styles.padding : ""}`}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
