import { createBrowserRouter } from "react-router-dom";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Chat from "./chat/Chat";
import Home from "./home/Home";

const route = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chats/:_id",
    element: <Chat />,
  },
]);

export default route;
