import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";
import CreatePost from "./Components/CreatePost.jsx";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./Redux/Store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyPosts from "./Components/MyPosts.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

const persistor = persistStore(store);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      {
        path: "/createpost",
        element: (
          <ProtectedRoute>
            {" "}
            <CreatePost />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myposts",
        element: (
          <ProtectedRoute>
            {" "}
            <MyPosts />{" "}
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" autoClose={3000} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
