import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const Navbar = () => {
  const {user,signOutUser}=useAuth();
    const navOptions = <>
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/donation-requests'>donation requests</Link></li>
    <li><Link to='/blogs'>Blog</Link></li>
    <li><Link to='/login'>Login</Link></li>
    <li><Link to='/register'>Registration</Link></li>
    <li><Link to='/Dashboard'>Dashboard</Link></li>
   </>
    return (
        <>
   <div className="navbar fixed z-10 bg-opacity-30 bg-black max-w-screen-xl mx-auto text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Blood-Bridge</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                {user && user?.email ? (
                    // User is logged in
                    <div className="flex items-center space-x-2">
                        <img
                            className="h-12 w-12 rounded-full cursor-pointer"
                            src={user.photoURL}
                            alt="user"
                        />
                        <button
                            className="btn bg-orange-500 text-white font-bold py-2 px-4 rounded-md"
                            onClick={signOutUser}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    // User is not logged in
                    <div className="join">
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `btn join-item ${isActive ? "bg-orange-500 text-white" : "bg-gray-400"}`
                            }
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className={({ isActive }) =>
                                `btn join-item ${isActive ? "bg-orange-500 text-white" : "bg-gray-400"}`
                            }
                        >
                            Register
                        </NavLink>
                    </div>
                )}
            </div>
            </div>   
        </>
    );
};

export default Navbar;