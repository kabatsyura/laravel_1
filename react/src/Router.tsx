import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import User from "./views/User";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/user',
    element: <User />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;