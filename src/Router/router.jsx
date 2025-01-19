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
    },{
      path:'/dashboard',
      element:<Dashboard></Dashboard>,
      children:[
        {
          path:'donorHome',
          element:<DonorHome></DonorHome>
        },{
          path:'my-donation-requests',
          element:<MyDonationRequests></MyDonationRequests>
        },{
          path:'create-donation-request',
          element:<CreateDonationRequest></CreateDonationRequest>
        },
        // Admin routes
        {
          path:'all-users',
          element:<AllUsers></AllUsers>
        },{
          path:'all-blood-donation-request',
          element:<AllBloodDonationRequests></AllBloodDonationRequests>
        },{
          path:'content-management',
          element:<ContentManagement></ContentManagement>,
          children:[
            {
              path:'add-blog',
              element:<AddBlog></AddBlog>
            }
          ]
        },
        // Volunteer routes
        {
          path:'volunteer-home',
          element:<VolunteerHome></VolunteerHome>
        }, {
          path: 'all-blood-donation-request',
          element: <VolunteerBloodRequests />
        },
        {
          path: 'content-management',
          element: <VolunteerContentManagement />
        },{
          path:'edit-donation-request/:id',
          element:<EditDonationRequest></EditDonationRequest>,
        },{
          path:'donation-request-details/:id',
          element:<DonationRequestDetails></DonationRequestDetails>
        }
      ]
    }
  ]);

export default router;