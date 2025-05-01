import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import QuizzContainer from "./components/QuizzContainer.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Profile from "./components/Profile.jsx";
import AdminUser from "./components/AdminUsers.jsx";
import Ranking from "./components/Ranking.jsx";
import ForgotPass from "./components/ForgotPass.jsx";
import NewPassword from "./components/NewPassword.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header /> <Outlet /> <Footer />
      </>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/quiz",
        element: <QuizzContainer />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/my-profile",
        element: <Profile />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute requiredRole="ROLE_ADMIN">
            <>
              <AdminUser />
            </>
          </ProtectedRoute>
        ),
      },
      {
        path: "/ranking",
        element: <Ranking />,
      },
      {
        path: "/forgot-pass",
        element: <ForgotPass />,
      },
      {
        path: "/reset-pass",
        element: <NewPassword />,
      }
    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider> {/* Wrap everything with AuthProvider */}
    <RouterProvider router={router} />
  </AuthProvider>
);
