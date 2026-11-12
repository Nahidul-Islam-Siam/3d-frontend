import { createBrowserRouter, Navigate } from "react-router-dom";
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
import ProtectedAdminRoute from "./components/auth/ProtectedAdminRoute";
import Contact from "./pages/contact";
import Donate from "./pages/donate";
import YouMatter from "./pages/you-matter";
import StoriesThatSaveLives from "./pages/stories-that-save-lives";
import APlaceAtTheTable from "./pages/a-place-at-the-table";
import WelcomeHome from "./pages/welcome-home";
import SuicideAwarenessShowdown from "./pages/suicide-awareness-showdown";
import CmsSettingPublicPage from "./pages/legal-cms";
import ErrorPage from "./pages/error";

export const router = createBrowserRouter([
  // â”€â”€â”€ Dedicated Ant Design Admin Dashboard (Matches lab-admin-flow.base44.app) â”€â”€â”€
  {
    path: "/admin/*",
    element: (
      <ProtectedAdminRoute>
        <Dashboard />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdminRoute>
        <Dashboard />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/dashboard/*",
    element: (
      <ProtectedAdminRoute>
        <Dashboard />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedAdminRoute>
        <Dashboard />
      </ProtectedAdminRoute>
    ),
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
    path: "",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/experience-the-story",
        element: <About />,
      },
      {
        path: "/experience-story",
        element: <Navigate to="/experience-the-story" replace />,
      },
      {
        path: "/about",
        element: <Navigate to="/experience-the-story" replace />,
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
        path: "/how-we-serve/a-place-at-the-table",
        element: <APlaceAtTheTable />,
      },
      {
        path: "/a-place-at-the-table",
        element: <APlaceAtTheTable />,
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
        path: "/how-we-serve/stories-that-save-lives",
        element: <StoriesThatSaveLives />,
      },
      {
        path: "/stories-that-save-lives",
        element: <StoriesThatSaveLives />,
      },
      {
        path: "/suicide-awareness-showdown",
        element: <SuicideAwarenessShowdown />,
      },
      {
        path: "/showdown",
        element: <SuicideAwarenessShowdown />,
      },
      {
        path: "/how-we-serve/welcome-home",
        element: <WelcomeHome />,
      },
      {
        path: "/welcome-home",
        element: <WelcomeHome />,
      },
      {
        path: "/meet-us",
        element: <MeetUs />,
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
        path: "/privacy",
        element: (
          <CmsSettingPublicPage
            slug="privacy-policy"
            defaultTitle="Privacy Policy"
            description="Learn how Live Achieve Believe protects your privacy and handles contact, RSVP, volunteer, and audition submissions."
          />
        ),
      },
      {
        path: "/privacy-policy",
        element: <Navigate to="/privacy" replace />,
      },
      {
        path: "/terms",
        element: (
          <CmsSettingPublicPage
            slug="terms-and-conditions"
            defaultTitle="Terms and Conditions"
            description="Community participation guidelines and terms of service for Live Achieve Believe."
          />
        ),
      },
      {
        path: "/terms-and-conditions",
        element: <Navigate to="/terms" replace />,
      },
      {
        path: "/terms-and-condition",
        element: <Navigate to="/terms" replace />,
      },
      {
        path: "/about-us",
        element: (
          <CmsSettingPublicPage
            slug="about-us"
            defaultTitle="About Us"
            description="Learn about Live Achieve Believe, Inc. (LAB), our mission, and compassionate community outreach."
          />
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
