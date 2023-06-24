import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";
import { useState, useEffect } from 'react';
import PrivateRoutes from './utils/PrivateRoutes';
import Home from './components/Home/Home';
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import useAuth from './hooks/useAuth';
import Axios from './api/Axios'

import './App.css';
import { User } from "./Types";


function App() {
  const [user, setUser] = useState<User>({ username: "", email: "" });
  const [loading, setLoading] = useState<Boolean>(true);
  const authContext = useAuth();

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await Axios.get("/login", {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });
        console.log("Check login", res.data);
        authContext?.setAuth(() => res.data.loggedIn);
        setLoading(false);
      } catch (err) {
        console.error(err)
        authContext?.setAuth(() => false);
        setLoading(false);
      }
    }
    isLoggedIn();
  }, []);


  const routes: RouteObject[] = [
    {
      path: '/',
      element: <PrivateRoutes />,
      children: [
        {
          index: true,
          element: <Home />,
          path: "/",

        }
      ],

    },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> }
  ];
  const router = createBrowserRouter(routes);
  if(loading) return (
    <div className="app">
      <div className="loader"></div>
    </div>
  );
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
