import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserLoginPage from "./pages/UserLoginPage";
import UserSignupPage from "./pages/UserSignupPage";
import RiderLoginPage from "./pages/RiderLoginPage";
import RiderSignupPage from "./pages/RiderSignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/user-login",
    element: <UserLoginPage />,
  },
  {
    path: "/user-signup",
    element: <UserSignupPage />,
  },
  {
    path: "/rider-login",
    element: <RiderLoginPage />,
  },
  {
    path: "/rider-signup",
    element: <RiderSignupPage />,
  },

  {
    path: "/*",
    element: <Navigate to="/" />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
