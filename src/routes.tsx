import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthenticatedRoute } from "./components/layout/AuthenticatedRoute";
import { ConfiguredRoute } from "./components/layout/ConfiguredRoute";
import Calendar from "./views/Calendar";
import Categories from "./views/Categories";
import Configuration from "./views/Configuration";
import Dashboard from "./views/Dashboard";
import LandingPage from "./views/LandingPage";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Settings from "./views/Settings";
import Signup from "./views/Signup";
import Stats from "./views/Stats";

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
          path: "/categories",
          element: <Categories />,
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
