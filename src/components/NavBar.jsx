import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { useState, useRef } from "react";
import useOutsideClick from "../utils/useoutsideclick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Theme from "./theme";

const NavBar = () => {
  const { user, signOut, role, info } = useAuth();
  const [showNavbar, setShowNavbar] = useState(false);
  const [showUserAccountInMenu, setShowUserAccountInMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dropdownRef = useRef(null);
  const openmenuRef = useRef(null);
  const usermenuRef = useRef(null);

  const toggleNavbar = () => setShowNavbar((prev) => !prev);
  const toggleUserAccountMenu = () => setShowUserAccountInMenu((prev) => !prev);
  const toggleUserMenu = () => setShowUserMenu((prev) => !prev);

  useOutsideClick(
    dropdownRef,
    () => setShowUserAccountInMenu(false),
    "div ul li a"
  );
  useOutsideClick(openmenuRef, () => setShowNavbar(false), "div ul li a");
  useOutsideClick(usermenuRef, () => setShowUserMenu(false), "div ul li a");
  const handleLogOut = async () => {
    try {
      await signOut();
      toast.success("خروج");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="text-xs md:text-sm lg:text-base rounded-lg w-5/6 mx-auto  mt-3 shadow-md dark:shadow-2xl dark:bg-gray-900  bg-gray-300">
      <div className="h-20 flex items-center rounded-md mx-auto justify-between p-2.5">
        <div
          className="md:hidden hover:cursor-pointer"
          onClick={toggleNavbar}
          ref={openmenuRef}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        </div>

        <NavLink to={"/"} className="flex justify-center items-center">
          <ReactSVG src="src/assets/logo.svg" />
        </NavLink>

        <div
          className={`${
            showNavbar
              ? "absolute top-0 right-0 h-screen z-50 dark:bg-gray-900 bg-gray-300 w-60 pt-5"
              : "hidden"
          } md:flex md:static md:justify-center md:items-center text-center md:h-14`}
        >
          <div
            className="md:hidden absolute right-52 cursor-pointer"
            onClick={toggleNavbar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-x"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </div>
          <ul className="space-y-2 font-medium flex flex-col md:flex-row md:justify-around px-5">
            <div className="md:hidden">
              <ReactSVG src="src/assets/logo.svg" />
            </div>
            <li className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-inherit dark:md:hover:bg-inherit dark:md:hover:text-gray-200 md:hover:text-gray-700">
              <NavLink to={"/"}>خانه</NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-inherit dark:md:hover:bg-inherit dark:md:hover:text-gray-200 md:hover:text-gray-700">
              <NavLink to={"/libraryexplorer"}>جستجو</NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-inherit dark:md:hover:bg-inherit dark:md:hover:text-gray-200 md:hover:text-gray-700">
              <NavLink to={"/rules"}>شرایط و قوانین</NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-inherit dark:md:hover:bg-inherit dark:md:hover:text-gray-200 md:hover:text-gray-700">
              <NavLink to={"/aboutus"}>آشنایی با ما</NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-inherit dark:md:hover:bg-inherit dark:md:hover:text-gray-200 md:hover:text-gray-700">
              <NavLink to={"/faq"}>سوالات متداول</NavLink>
            </li>
          </ul>
        </div>
        <div className="flex">
          <Theme />
          {user ? (
            <div
              ref={usermenuRef}
              onClick={toggleUserMenu}
              className="flex items-center pr-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cursor-pointer relative"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
              </svg>
              {showUserMenu && (
                <div className="absolute end-5 z-10 top-16 p-3 w-56 divide-y dark:divide-gray-700 divide-gray-100 rounded-md bg-white dark:bg-gray-600 shadow-lg dark:shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                  <h3 className="">{info.name}</h3>
                  <ul className="no-list-style">
                    {role === "user" && (
                      <li className="py-2.5 text-center">
                        <NavLink
                          to={`/profile/${user.id}`}
                          className="flex justify-center items-center"
                        >
                          مشاهده پروفایل
                          <FontAwesomeIcon icon={faArrowLeft} />
                        </NavLink>
                      </li>
                    )}
                    {role === "level1" && (
                      <li className="py-2.5 text-center">
                        <NavLink
                          to={`/level1dasboard/${user.id}`}
                          className="flex justify-center items-center"
                        >
                          مشاهده پروفایل
                          <FontAwesomeIcon icon={faArrowLeft} />
                        </NavLink>
                      </li>
                    )}
                    {role === "level2" && (
                      <li className="py-2.5 text-center">
                        <NavLink
                          to={`/level2dasboard/${user.id}`}
                          className="flex justify-center items-center"
                        >
                          مشاهده پروفایل
                          <FontAwesomeIcon icon={faArrowLeft} />
                        </NavLink>
                      </li>
                    )}
                    <li
                      onClick={handleLogOut}
                      className="cursor-pointer flex items-center"
                    >
                      <FontAwesomeIcon icon={faSignOut} />
                      خروج از حساب کاربری
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div ref={dropdownRef}>
              <NavLink
                onClick={toggleUserAccountMenu}
                className="flex items-center pr-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="md:hidden"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M15 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                  <path d="M21 12h-13l3 -3" />
                  <path d="M11 15l-3 -3" />
                </svg>
                <span className="hidden md:block relative">حساب کاربری</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="hidden md:block"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 9l6 6l6 -6" />
                </svg>
              </NavLink>
              {showUserAccountInMenu && (
                <div className="absolute end-5 z-10 mt-2 w-56 rounded-md bg-gray-200 dark:bg-gray-600 shadow-lg dark:shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                  <ul className="no-list-style">
                    <li className="py-2.5 text-center">
                      <NavLink to="/signin" className="hover:underline">
                        ورود
                      </NavLink>
                    </li>
                    <li className="py-2.5 text-center">
                      <NavLink to="/signup" className="hover:underline">
                        ثبت نام
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
