import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import { Home } from "./Home";
import { Login } from "./Login";
import { SingUp } from "./SignUp";
import { Dashboard } from "./Dashboards";
import { Profile } from "./Profile";
import { useLocalStorage } from "react-use";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SingUp />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/:username",
    element: <Profile />,
  },
]);

export const Router = () => <RouterProvider router={router} />;
