import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import DonorHome from "../pages/Dashboard/Donor/DonorHome/DonorHome";
import MyDonationRequests from "../pages/Dashboard/Donor/MyDonationRequests/MyDonationRequests";
import CreateDonationRequest from "../pages/Dashboard/Donor/CreateDonationRequest/CreateDonationRequest";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import AllBloodDonationRequests from "../pages/Dashboard/Admin/AllBloodDonationRequests/AllBloodDonationRequests";
import ContentManagement from "../pages/Dashboard/Admin/ContentManagement/ContentManagement";
import AddBlog from "../pages/Dashboard/Admin/AddBlog/AddBlog";
import VolunteerHome from "../pages/Dashboard/Volunteer/VolunteerHome/VolunteerHome";
import VolunteerContentManagement from "../pages/Dashboard/Volunteer/VolunteerContentManagement/VolunteerContentManagement";
import VolunteerBloodRequests from "../pages/Dashboard/Volunteer/VolunteerBloodRequests/VolunteerBloodRequests";
import EditDonationRequest from "../Shared/EditDonationRequest";
import DonationRequestDetails from "../Shared/DonationRequestDetails";
import Search from "../pages/Search/Search";
import DonationRequests from "../pages/DonationRequests/DonationRequests";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Blog from "../pages/Blog/Blog";
import BlogDetails from "../pages/Blog/BlogDetails";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import DonorProfile from "../pages/Dashboard/Profile/DonorProfile";
import Events from "../pages/Events/Events";
import AboutUs from "../pages/AboutUs/AboutUs";

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
       },{
        path:'search',
        element:<Search></Search>
       },{
        path:"donation-requests",
        element:<DonationRequests></DonationRequests>
       },{
        path:'donation-request-details/:id',
        element:<PrivateRoute><DonationRequestDetails></DonationRequestDetails></PrivateRoute>
      },{
        path:'blogs',
        element:<Blog></Blog>
      },{
        path:'blogs/:id',
        element:<BlogDetails></BlogDetails>,
        loader:({params})=>fetch(`https://blood-bridge-server-steel.vercel.app/blogs/${params.id}`)
      },{
        path:'/events',
        element:<Events></Events>
       },{
        path:'/about',
        element:<AboutUs></AboutUs>
       }

      ]
    },{
      path:'/dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path:'donorHome',
          element:<DonorHome></DonorHome>
        },{
          path:'donorProfile',
          element:<DonorProfile></DonorProfile>
        },{
          path:'my-donation-requests',
          element:<MyDonationRequests></MyDonationRequests>
        },{
          path:'create-donation-request',
          element:<CreateDonationRequest></CreateDonationRequest>
        },
        // Admin routes
        {
         path:'adminHome',
         element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path:'all-users',
          element:<AllUsers></AllUsers>
        },{
          path:'all-blood-donation-request',
          element:<AllBloodDonationRequests></AllBloodDonationRequests>
        },{
          path:'content-management',
          element:<ContentManagement ></ContentManagement>,
        },
        {
          path:'add-blog',
          element:<AddBlog></AddBlog>
        },
        // Volunteer routes
        {
          path:'volunteerHome',
          element:<VolunteerHome></VolunteerHome>
        }, {
          path: 'all-blood-donations-request',
          element: <VolunteerBloodRequests />
        },
        {
          path: 'content-management',
          element: <VolunteerContentManagement />
        },{
          path:'edit-donation-request/:id',
          element:<EditDonationRequest></EditDonationRequest>,
        }
      ]
    },
    {
      path:'*',
      element:<ErrorPage></ErrorPage>
  }
  ]);

export default router;