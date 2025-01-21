import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    // Simulate role; in a real scenario, fetch this from the user's context or state
    const userRole = "Admin"; // or "Admin" / "Donor" based on the user's role

    return (
        <>
            <div className="md:flex p-7 gap-4">
                {/* Sidebar - Dashboard navigation */}
                <div className="md:w-64 w-full md:min-h-screen h-[300px] bg-blue-300 p-4">
                    <h2 className="text-white text-center text-2xl font-semibold mb-6">Dashboard</h2>
                    <ul className="menu p-4 text-lg font-semibold">
                        {userRole === "Admin" && (
                            <>
                                <li><NavLink to="/dashboard/all-users">All Users</NavLink></li>
                                <li><NavLink to="/dashboard/all-blood-donation-request">All Blood Donation Requests</NavLink></li>
                                <li><NavLink to="/dashboard/content-management">Content Management</NavLink></li>
                            </>
                        )}

                        {userRole === "Donor" && (
                            <>
                                <li><NavLink to="/dashboard/donorHome">Donor Home</NavLink></li>
                                <li><NavLink to="/dashboard/my-donation-requests">My Donation Requests</NavLink></li>
                                <li><NavLink to="/dashboard/create-donation-request">Create Donation Request</NavLink></li>
                            </>
                        )}

                        {userRole === "Volunteer" && (
                            <>
                                <li><NavLink to="/dashboard/volunteer-home">Volunteer Home</NavLink></li>
                                <li><NavLink to="/dashboard/all-blood-donations-request">All Blood Donation Requests</NavLink></li>
                                <li><NavLink to="/dashboard/content-management">Manage Donation Requests</NavLink></li>
                            </>
                        )}
                    </ul>
                </div>
                {/* Content area */}
                <div className="flex-1 p-8 bg-gray-100">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
