import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Dashboard = () => {
    const { user} = useAuth();
    const [isAdmin]=useAdmin();
    const axiosPublic= useAxiosPublic();

    const userRole = sessionStorage.getItem('userRole');


    


    // console.log(user);

    // Conditional rendering based on role
    const renderNavLinks = () => {
        if (userRole === "admin") {
            return (
                <>
                    <li><NavLink to="/dashboard/adminHome" className="text-white ">Overview</NavLink></li>
                    <li><NavLink to="/dashboard/all-users" className="text-white ">All Users</NavLink></li>
                    <li><NavLink to="/dashboard/all-blood-donation-request" className="text-white ">All Blood Donation Requests</NavLink></li>
                    <li><NavLink to="/dashboard/content-management" className="text-white ">Content Management</NavLink></li>
                </>
            );
        }else if (userRole === "donor") {
            // console.log(user?.role);
            
            return (
                <>
                    <li><NavLink to="/dashboard/donorProfile" className="text-white ">My Profile</NavLink></li>
                    <li><NavLink to="/dashboard/my-donation-requests" className="text-white ">My Donation Requests</NavLink></li>
                    <li><NavLink to="/dashboard/create-donation-request" className="text-white ">Create Donation Request</NavLink></li>
                </>
            );
        }else if (userRole === "volunteer") {
            return (
                <>
                
                    <li><NavLink to="/dashboard/all-blood-donations-request" className="text-white ">All Blood Donation Requests</NavLink></li>
                    <li><NavLink to="/dashboard/content-management" className="text-white ">Manage Donation Requests</NavLink></li>
                </>
            );
        }
     // If user role is not found
        return null;  
    };

    return (
        <div className="md:flex min-h-screen">
            {/* Sidebar - Dashboard navigation */}
            <div className="md:w-64 w-full bg-blue-300 p-4">
                <div className="btn outline text-xl flex gap-2 justify-center items-center mb-6">
                    <IoArrowBackCircleSharp />
                    <Link to="/"> Back Home</Link>
                </div>
                <h2 className="text-white text-center text-2xl font-bold">Dashboard</h2>
                <ul className="menu text-lg p-2 space-y-2">
                    {renderNavLinks()}
                </ul>
            </div>
            {/* Content area */}
            <div className="flex-1 p-6 bg-gray-100 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
