import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home";
import RegistrationPage from "../pages/RegistartionPage";
import LoginPage from "../pages/LoginPage";
import AiChat from "../pages/AiChat";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/signUp",
        element: <RegistrationPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/chat",
        element: <AiChat />,
      },
    ],
  },
]);
