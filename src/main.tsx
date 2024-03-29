import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/root/Root.tsx";
import Home from "./pages/Home.tsx";
import Credentials from "./pages/Credentials.tsx";
import SignUpForm, { createNewUser } from "./components/forms/SignUpForm.tsx";
import LoginForm from "./components/forms/LoginForm.tsx";
import AuthProvider from "./components/authProvider/AuthProvider.tsx";
import Categories from "./pages/Categories.tsx";
import Logout from "./pages/Logout.tsx";
import CategoryContainer from "./pages/CategoryContainer.tsx";
import PostContainer from "./pages/PostContainer.tsx";
import FreshPosts from "./pages/FreshPosts.tsx";
import Profile from "./pages/Profile.tsx";
import Settings from "./pages/Settings.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <Credentials />,
        children: [
          {
            path: "/login",
            element: <LoginForm />,
          },
          {
            path: "/sign-up",
            element: <SignUpForm />,
            action: createNewUser,
          },
        ],
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/categories/:id",
        element: <CategoryContainer />,
      },
      {
        path: "/posts",
        element: <FreshPosts />,
      },
      {
        path: "/posts/:id",
        element: <PostContainer />,
      },
      {
        path: "/users/:id",
        element: <Profile />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
