import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../components/home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
     
      { path: "login", element: <Login /> },     // corrected here
      { path: "register", element: <Register /> }, // corrected here
    ],
  },
]);

export default router;
