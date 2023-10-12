import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Profile from "./components/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
]);
