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
  { title: "Log out", href: "#", Icon: ArrowRightStartOnRectangleIcon },
];

type SidebarProps = {
  selected: string;
  sidebarOpen: boolean;
  setSidebarOpen: (bool: boolean) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({
  selected,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const logout = useLogout();
  const { user, setToken } = useAuth();
  const { currentSession } = useSelectSession();
  return (
    <div
      className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.topContent}>
        <div className={styles.sessionDisplay}>
          <div className={styles.sessionIconWrapper}>
            <DocumentChartBarIcon />
          </div>
          <span>{currentSession ? currentSession.title : "Session"}</span>
        </div>
      </div>
      <ul className={styles.ul}>
        {links.map((content, index) => (
          <li key={content.title} className={styles.li}>
            <SidebarLink
              content={content}
              selected={selected === content.title}
            />
          </li>
        ))}
      </ul>
      {user && (
        <div className={styles.bottomContent}>
          <div className={styles.userDisplay} onClick={logout}>
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
