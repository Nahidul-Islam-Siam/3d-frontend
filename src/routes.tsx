import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import RootLayout from "./pages/Layout";
import NotFound from "./pages/not-found";
import About from "./pages/experience-story";
import Movement from "./pages/movement";
import WhoWeAre from "./pages/who-we-are";
import HowWeServe from "./pages/how-we-serve";
import MeetUs from "./pages/meet-us";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Contact from "./pages/contact";
import Donate from "./pages/donate";
import YouMatter from "./pages/you-matter";
import ErrorPage from "./pages/error";

export const router = createBrowserRouter([
  // â”€â”€â”€ Dedicated Ant Design Admin Dashboard (Matches lab-admin-flow.base44.app) â”€â”€â”€
  {
    path: "/admin/*",
    element: <Dashboard />,
  },
  {
    path: "/admin",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/*",
    element: <Dashboard />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },


  {
    path: "",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/experience-the-story",
        element: <About />,
      },
      {
        path: "/movement",
        element: <Movement />,
      },
      {
        path: "/join-the-movement",
        element: <Movement />,
      },
      {
        path: "/who-we-are",
        element: <WhoWeAre />,
      },
      {
        path: "/how-we-serve",
        element: <HowWeServe />,
      },
      {
        path: "/how-we-serve/you-matter",
        element: <YouMatter />,
      },
      {
        path: "/you-matter",
        element: <YouMatter />,
      },
      {
        path: "/meet-us",
        element: <MeetUs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/donate",
        element: <Donate />,
      },
      {
        path: "/give-hope",
        element: <Donate />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
