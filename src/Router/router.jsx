import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";


const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayout></MainLayout>,
      children:[
       {
        path:'/',
        element:<Home></Home>
       },{
        path:'login',
        element:<Login></Login>
       },{
        path:'register',
        element:<SignUp></SignUp>
       }

      ]
    },
  ]);

export default router;