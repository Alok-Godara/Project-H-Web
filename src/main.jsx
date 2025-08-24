import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import App from "./App.jsx";
import "./index.css";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/app",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
    // errorElement: <CustomErrorPage />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
