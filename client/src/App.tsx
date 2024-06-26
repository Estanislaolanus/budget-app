import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";
import { useState, useEffect } from 'react';
import PrivateRoutes from './utils/PrivateRoutes';
import Home from './components/Home/Home';
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import useAuth from './hooks/useAuth';
import Axios from './api/Axios';
import useUser from "./hooks/useUser";
import VerifyEmail from "./components/VerifyEmail/VerifyEmail";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [loading, setLoading] = useState<Boolean>(true);
  const authContext = useAuth();
  const userContext = useUser();
  useEffect(() => {
    const getQueryParam = (name: string) => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    };
    const isLoggedIn = async () => {
      try {
        const param = getQueryParam('access_token');
        if (param) localStorage.setItem('accessToken', param);
        const accessToken = localStorage.getItem("accessToken");
        const res = await Axios.get("/login", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        });
        const data = res.data;
        authContext?.setAuth(() => data.loggedIn);
        if (data.user) {
          userContext?.setUser(() => {
            return { username: data.user.username ?? "", email: data.user.email ?? "", isEmailVerified: data.user.isEmailVerified ?? false };
          });
        }
        setLoading(false);
      } catch (err) {
        console.error(err)
        authContext?.setAuth(() => false);
        setLoading(false);

      }
    }
    isLoggedIn();
  }, [authContext, userContext]);


  const routes: RouteObject[] = [
    {
      path: '/',
      element: <PrivateRoutes />,
      children: [
        {
          index: true,
          element: <Home />,
          path: "/",
        },
      ],
    },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/verifyEmail", element: <VerifyEmail /> }
  ];
  const router = createBrowserRouter(routes);
  if (loading) return (
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
