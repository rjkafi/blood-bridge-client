import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { TbLogout } from "react-icons/tb";
import { TiWeatherSunny } from "react-icons/ti";
import { BsMoon } from "react-icons/bs";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "mytheme");
      localStorage.setItem("theme", "mytheme");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const userRole = sessionStorage.getItem("userRole");

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 transition-colors ${isActive ? "text-red-500" : "text-base-content"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/donation-requests"
          className={({ isActive }) =>
            `px-4 py-2 transition-colors ${isActive ? "text-red-500" : "text-base-content"
            }`
          }
        >
          Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            `px-4 py-2 transition-colors ${isActive ? "text-red-500" : "text-base-content"
            }`
          }
        >
          Blog
        </NavLink>
      </li>

      {user?.email && (
        <li>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `px-4 py-2 transition-colors ${isActive ? "text-red-500" : "text-base-content"
              }`
            }
          >
            Events
          </NavLink>
        </li>
      )}
     {user?.email &&(
      <li>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `px-4 py-2 transition-colors ${isActive ? "text-red-500" : "text-base-content"
          }`
        }
      >
        About Us
      </NavLink>
    </li>

     )}
     

    </>
  );

  return (
    <div className="navbar  sticky top-0 z-50 bg-transparent bg-base-200 backdrop-blur-lg">
      <div className="navbar-start ">
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
            className=" menu-sm dropdown-content text-black bg-gray-400 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
        <img
          className="h-16 w-24 md:ml-4"
          src="https://i.ibb.co.com/h1zKYzZ/1-removebg-preview.png"
          alt=""
        />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className=" menu-horizontal px-1">{navOptions}</ul>
      </div>

      <div className="navbar-end md:pr-5">
        <button
          className="text-2xl cursor-pointer text-base-content btn hover:bg-base-300 btn-circle btn-ghost hover:text-orange-500"
          onClick={toggleDarkMode}
        >
          {darkMode ? <TiWeatherSunny /> : <BsMoon />}
        </button>
        {user && user?.email ? (
          <div className="flex items-center space-x-2">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="">
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
                  {userRole == "admin" && (
                    <li>
                      <Link
                        className="bg-blue-400 text-white text-lg font-semibold"
                        to="/dashboard/adminHome"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  {userRole == "volunteer" && (
                    <li>
                      <Link
                        className="bg-blue-400 text-white text-lg font-semibold"
                        to="/dashboard/volunteerhome"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}

                  {userRole !== "volunteer" && userRole !== "admin" ? (
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
          <div className="btn bg-gradient-to-r font-semibold text-white from-teal-400 to-blue-500">
            <NavLink to="/login">Login</NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
