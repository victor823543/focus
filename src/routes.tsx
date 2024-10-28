import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthenticatedRoute } from "./components/layout/AuthenticatedRoute";
import ConfiguredRoute from "./components/layout/ConfiguredRoute";
import Calendar from "./views/Calendar";
import Categories from "./views/Categories";
import Category from "./views/Category";
import Configuration from "./views/Configuration";
import Dashboard from "./views/Dashboard";
import Daystats from "./views/Daystats";
import LandingPage from "./views/LandingPage";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Settings from "./views/Settings";
import Signup from "./views/Signup";
import Stats from "./views/Stats";
import Weekstats from "./views/Weekstats";

const Routes = () => {
  const openRoutes = [
    {
      path: "/",
      element: <LandingPage />,
      errorElement: <NotFound />,
    },
    {
      path: "/signup",
      element: <Signup />,
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <NotFound />,
    },
  ];

  const authenticatedRoutes = [
    {
      path: "/",
      element: <AuthenticatedRoute />,
      children: [
        {
          path: "/configuration",
          element: <Configuration />,
        },
      ],
    },
  ];
  const configurationCompletedRoutes = [
    {
      path: "/",
      element: <ConfiguredRoute />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/calendar",
          element: <Calendar />,
        },
        {
          path: "/stats",
          element: <Stats />,
        },
        {
          path: "/stats/day",
          element: <Daystats />,
        },
        {
          path: "/stats/week",
          element: <Weekstats />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/categories/:id",
          element: <Category />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...openRoutes,
    ...authenticatedRoutes,
    ...configurationCompletedRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
