import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { TbLogout } from "react-icons/tb";



const Navbar = () => {
  const { user, signOutUser } = useAuth();


  const userRole = sessionStorage.getItem('userRole');

  const navOptions = <>
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/donation-requests'>Donation Requests</Link></li>
    <li><Link to='/blogs'>Blog</Link></li>

    {user?.email && (
      <>
        <li><Link to='/funds'>Funding</Link></li>
      </>
    )}
  </>;

  return (
    <div className="navbar fixed z-10 bg-opacity-30 bg-black max-w-screen-xl mx-auto text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-blue-300 text-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
        <img className="h-16 w-24" src="https://i.ibb.co.com/h1zKYzZ/1-removebg-preview.png" alt="" />
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
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost">
                <img
                  className="h-12 w-12 rounded-full cursor-pointer"
                  src={user.photoURL}
                  alt="user"
                />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-6 shadow bg-base-100 rounded-box w-52"
              >
                <div className="space-y-3">
                  {
                    userRole == 'admin' && <li><Link className="bg-blue-400 text-white text-lg font-semibold" to="/dashboard/adminHome">Dashboard</Link></li>
                  }
                  {
                    userRole == 'volunteer' && <li><Link className="bg-blue-400 text-white text-lg font-semibold" to="/dashboard/volunteerhome">Dashboard</Link></li>
                  }

                  {userRole !== 'volunteer' && userRole !== 'admin' ? (
                   <li>
                     <Link
                      className="bg-blue-400 text-white text-lg font-semibold"
                      to="/dashboard/donorHome"
                    >
                      Dashboard
                    </Link>
                   </li>
                  ) : null}

                  <li>

                    <button
                      className="w-full text-left text-white text-lg font-semibold bg-orange-400"
                      onClick={signOutUser}
                    >
                      <TbLogout /> Logout
                    </button>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        ) : (
          // User is not logged in
          <div className=" btn bg-gradient-to-r  font-semibold text-white from-teal-400 to-blue-500" >
            <NavLink
              to="/login"
              className=''
            >
              Login
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
