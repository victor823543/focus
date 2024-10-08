import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthenticatedRoute } from "./components/layout/AuthenticatedRoute";
import Calendar from "./views/Calendar";
import Categories from "./views/Categories";
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

  const router = createBrowserRouter([...openRoutes, ...authenticatedRoutes]);

  return <RouterProvider router={router} />;
};

export default Routes;
