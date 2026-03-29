import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
// import CookieBanner from "./components/CookieBanner.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import QuizEngine from "./features/quiz/pages/QuizEngine.jsx";
import { capitalQuiz, flagQuiz, mapQuiz } from "./features/quiz/strategies/index.js";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header /> <Outlet /> <Footer /> {/* <CookieBanner /> */}
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
        path: "/quiz/map",
        element: <QuizEngine strategy={mapQuiz} />,
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
