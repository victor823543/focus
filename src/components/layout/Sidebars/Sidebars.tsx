import {
  DocumentChartBarIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowRightStartOnRectangleIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";
import useSelectSession from "../../../hooks/useSelectSession";
import { useAuth } from "../../../provider/authProvider";
import SidebarLink from "../SidebarLink/SidebarLink";
import styles from "./Sidebars.module.css";

export type LinkItem = {
  title: string;
  href: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
};

const links: LinkItem[] = [
  { title: "Dashboard", href: "/dashboard", Icon: ChartPieIcon },
  { title: "Calendar", href: "/calendar", Icon: CalendarDaysIcon },
  { title: "Stats", href: "/stats", Icon: ChartBarIcon },
  { title: "Categories", href: "/categories", Icon: TagIcon },
  { title: "Settings", href: "/settings", Icon: Cog6ToothIcon },
];

const logoutContent: LinkItem = {
  title: "Log out",
  href: "#",
  Icon: ArrowRightStartOnRectangleIcon,
};

type SidebarProps = {
  selected: string;
  sidebarOpen: boolean;
  setSidebarOpen: (bool: boolean) => void;
  loading?: boolean;
};

export const Sidebar: React.FC<SidebarProps> = ({
  selected,
  sidebarOpen,
  setSidebarOpen,
  loading = false,
}) => {
  const logout = useLogout();
  const { user, setToken } = useAuth();
  const { currentSession } = useSelectSession();
  const [showSessionDropdown, setShowSessionDropdown] = useState(false);

  return (
    <div
      className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.topContent}>
        <div
          className={styles.sessionDisplay}
          onClick={() => setShowSessionDropdown(!showSessionDropdown)}
          data-cy={loading ? "" : "session-display"}
        >
          <div className={styles.sessionIconWrapper}>
            <DocumentChartBarIcon />
          </div>
          <span>{currentSession ? currentSession.title : "Session"}</span>
          {showSessionDropdown && (
            <SessionDropdown
              show={showSessionDropdown}
              setShow={setShowSessionDropdown}
            />
          )}
        </div>
      </div>
      <ul className={styles.ul}>
        {links.map((content) => (
          <li key={content.title} className={styles.li}>
            <SidebarLink
              content={content}
              selected={selected === content.title}
            />
          </li>
        ))}
        <li key={logoutContent.title} className={styles.li} onClick={logout}>
          <SidebarLink
            content={logoutContent}
            selected={selected === logoutContent.title}
          />
        </li>
      </ul>
      {user && (
        <div className={styles.bottomContent}>
          <div className={styles.userDisplay}>
            <div className={styles.iconWrapper}>
              <UserCircleIcon />
            </div>
            <span>{user?.username}</span>
          </div>
        </div>
      )}
      <div className={styles.closeBtn} onClick={() => setSidebarOpen(false)}>
        <XMarkIcon />
      </div>
    </div>
  );
};

type SessionDropdownProps = {
  show: boolean;
  setShow: (bool: boolean) => void;
};

const SessionDropdown: React.FC<SessionDropdownProps> = ({ show, setShow }) => {
  const { currentSession, selectSession, sessions } = useSelectSession();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <div
      className={styles.sessionDropdown}
      ref={dropdownRef}
      data-cy="session-dropdown"
    >
      <div className={styles.currentSessionWrapper}>
        <div
          className={`${styles.sessionOption} ${styles.currentSession}`}
          data-cy="selected-session"
        >
          {currentSession ? currentSession.title : "Session"}
        </div>
      </div>

      {sessions && sessions.length > 1 ? (
        [...sessions]
          .filter((session) => session.id !== currentSession?.id)
          .map((session) => (
            <div
              key={session.id}
              className={styles.sessionOption}
              onClick={() => {
                selectSession(session);
              }}
              data-cy="session-option"
            >
              {session.title}
            </div>
          ))
      ) : (
        <div
          className={styles.sessionOption}
          onClick={() => navigate("/configuration")}
          data-cy="add-session"
        >
          Add new Session
        </div>
      )}
      {sessions && sessions.length > 1 && (
        <div className={styles.addSessionWrapper}>
          <div
            className={`${styles.sessionOption} ${styles.addSession}`}
            onClick={() => navigate("/configuration")}
            data-cy="add-session"
          >
            Add new Session
          </div>
        </div>
      )}
    </div>
  );
};
