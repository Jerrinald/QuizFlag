import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import { AuthProvider } from "./features/auth/contexts/AuthContext.jsx";
import Profile from "./features/profile/pages/Profile.jsx";
import AdminUser from "./features/admin/pages/AdminUsers.jsx";
import Ranking from "./features/flag/pages/Ranking.jsx";
import QuizEngine from "./features/quiz/pages/QuizEngine.jsx";
import { flagQuiz, capitalQuiz } from "./features/quiz/strategies/index.js";
import ForgotPass from "./features/auth/pages/ForgotPass.jsx";
import NewPassword from "./features/auth/pages/NewPassword.jsx";
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
        path: "/quiz/flag",
        element: <QuizEngine strategy={flagQuiz} />,
      },
      {
        path: "/quiz/capital",
        element: <QuizEngine strategy={capitalQuiz} />,
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
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
