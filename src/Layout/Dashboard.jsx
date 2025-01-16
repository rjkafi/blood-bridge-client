import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    const isAdmin=true;
    return (
        <>
            <div className="md:flex p-7 gap-4">
                {/* Sidebar - Dashboard navigation */}
                <div className="md:w-64 w-full md:min-h-screen h-[300px] bg-orange-400 p-4">
                    <h2 className="text-white text-center text-2xl font-semibold mb-6">Dashboard</h2>
                    <ul className="menu p-4 text-lg font-semibold">
                        {/* {user.role === "Admin" && (
                            <>
                                <li><NavLink to="/dashboard/all-users">All Users</NavLink></li>
                                <li><NavLink to="/dashboard/all-blood-donation-request">All Blood Donation Requests</NavLink></li>
                                <li><NavLink to="/dashboard/content-management">Content Management</NavLink></li>
                            </>
                        )} */}

                        {
                            isAdmin ? <>
                             <li><NavLink to="/dashboard/all-users">All Users</NavLink></li>
                                <li><NavLink to="/dashboard/all-blood-donation-request">All Blood Donation Requests</NavLink></li>
                                <li><NavLink to="/dashboard/content-management">Content Management</NavLink></li>
                            </> 
                            :
                            <>
                              <li><NavLink to="/dashboard/donorHome">Donor Home</NavLink></li>
                                <li><NavLink to="/dashboard/my-donation-requests">My Donation Requests</NavLink></li>
                                <li><NavLink to="/dashboard/create-donation-request">Create Donation Request</NavLink></li>
                            </>
                           
                        }


                       
                            {/* <>
                                <li><NavLink to="/dashboard/donorHome">Donor Home</NavLink></li>
                                <li><NavLink to="/dashboard/my-donation-requests">My Donation Requests</NavLink></li>
                                <li><NavLink to="/dashboard/create-donation-request">Create Donation Request</NavLink></li>
                            </> */}
                     
                        {/* {user.role === "Volunteer" && (
                            <li><NavLink to="/dashboard/all-blood-donation-request">Blood Donation Requests</NavLink></li>
                        )} */}

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