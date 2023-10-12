import "./index.css";
import App from "./App";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./components/Profile";
import { router } from "./routes";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
