import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";
import './App.css';
import Home from './components/Home/Home';
import Root from "./components/Root/Root";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  { path: "/register", element: <Register/> },
  { path: "/login", element: <Login/> }
];
const router = createBrowserRouter(routes)

function App() {
  return (
    <div className="app">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
