import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    // Simulate role; in a real scenario, fetch this from the user's context or state
    const userRole = "Admin"; // or "Admin" / "Donor" based on the user's role

    return (
        <div className="md:flex min-h-screen">
            {/* Sidebar - Dashboard navigation */}
            <div className="md:w-64 w-full bg-blue-300 p-4">
                <div className="btn-sm outline text-xl flex gap-2 justify-center items-center mb-6">
                    <IoArrowBackCircleSharp />
                    <Link to="/"> Back Home</Link>
                </div>
                <h2 className="text-white text-center text-2xl font-bold">Dashboard</h2>
                <ul className="menu text-lg p-2 space-y-2">
                    {userRole === "Admin" && (
                        <>
                            <li><NavLink to="/dashboard/all-users" activeClassName="text-white bg-blue-500">All Users</NavLink></li>
                            <li><NavLink to="/dashboard/all-blood-donation-request" activeClassName="text-white bg-blue-500">All Blood Donation Requests</NavLink></li>
                            <li><NavLink to="/dashboard/content-management" activeClassName="text-white bg-blue-500">Content Management</NavLink></li>
                        </>
                    )}

                    {userRole === "Donor" && (
                        <>
                            <li><NavLink to="/dashboard/donorHome" activeClassName="text-white bg-blue-500">Donor Home</NavLink></li>
                            <li><NavLink to="/dashboard/my-donation-requests" activeClassName="text-white bg-blue-500">My Donation Requests</NavLink></li>
                            <li><NavLink to="/dashboard/create-donation-request" activeClassName="text-white bg-blue-500">Create Donation Request</NavLink></li>
                        </>
                    )}

                    {userRole === "Volunteer" && (
                        <>
                            <li><NavLink to="/dashboard/volunteer-home" activeClassName="text-white bg-blue-500">Volunteer Home</NavLink></li>
                            <li><NavLink to="/dashboard/all-blood-donations-request" activeClassName="text-white bg-blue-500">All Blood Donation Requests</NavLink></li>
                            <li><NavLink to="/dashboard/content-management" activeClassName="text-white bg-blue-500">Manage Donation Requests</NavLink></li>
                        </>
                    )}
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
