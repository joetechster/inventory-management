import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { redirect } from "react-router-dom";
import { getUser } from "./utils/auth";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Inventory from "./pages/Inventory";
import DashBoard from "./pages/DashBoard";
import Orders from "./pages/Orders";
import Transactions from "./pages/Transactions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: async () => {
      const user = getUser();
      if (!user) {
        return redirect("/sign-in");
      }
      return null;
    },
    children: [
      { path: "/", element: <DashBoard /> },
      { path: "/inventory", element: <Inventory /> },
      { path: "/orders", element: <Orders /> },
      { path: "/transactions", element: <Transactions /> },
    ],
  },
  { path: "sign-in", element: <SignIn /> },
  { path: "sign-up", element: <SignUp /> },
]);

export default router;
