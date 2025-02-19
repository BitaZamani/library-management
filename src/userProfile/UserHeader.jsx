import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Theme from "../components/theme";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supbase";
const UserHeader = ({ setActiveComponent, updateUnseenMessagesCount }) => {
  const { signOut, user } = useAuth();
  const [component, setComponent] = useState("statics");
  const [counts, setCounts] = useState(null);
  const handleMenuItemClick = (componentName) => {
    setActiveComponent(componentName);
    setComponent(componentName);
  };
  const getCounts = async () => {
    const user_id = user.id;
    const { data, error } = await supabase
      .from("userstats")
      .select()
      .eq("user", user_id)
      .single();
    if (error) {
      console.log(error);
      return;
    }
    setCounts(data);
    updateUnseenMessagesCount(data.unseen_messages);
  };
  useEffect(() => {
    getCounts();
  }, []);
  return (
    <div className="">
      <div className="py-3 px-5 flex justify-between items-center bg-gray-300 dark:bg-gray-950 border-b dark:border-gray-800">
        <span className="text-lg">پنل کاربری</span>
        <div className="flex">
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
            className="ml-4 cursor-pointer"
            onClick={() => signOut()}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
            <path d="M15 12h-12l3 -3" />
            <path d="M6 15l-3 -3" />
          </svg>
          <NavLink to="/">
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
              className="ml-4"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
              <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
            </svg>
          </NavLink>
          <Theme />
        </div>
      </div>
      <div className="bg-gray-300 dark:bg-gray-950 rounded-b-md p-1">
        <ul className="flex text-sm md:text-base justify-around w-4/5 mx-auto">
          <li
            className={`${
              component == "statics" && "border-b-2 border-blue-700"
            } py-1 px-1`}
          >
            <button onClick={() => handleMenuItemClick("statics")}>
              صفحه اصلی
            </button>
          </li>
          <li
            className={`${
              component == "bookdoc" && "border-b-2 border-blue-700"
            } py-1 px-1`}
          >
            <button onClick={() => handleMenuItemClick("bookdoc")}>
              مدیریت کتاب‌ها
            </button>
          </li>
          <li
            className={`${
              component == "edit" && "border-b-2 border-blue-700"
            } py-1 px-1`}
          >
            <button onClick={() => handleMenuItemClick("edit")}>
              مدیریت حساب
            </button>
          </li>
          <li
            className={`${
              component == "messages" && "border-b-2 border-blue-700"
            } py-1 px-1 flex`}
          >
            <button onClick={() => handleMenuItemClick("messages")}>
              پیام‌ها
            </button>
            {counts?.unseen_messages !== 0 && (
              <div className="bg-red-500 rounded-full w-5 h-5 flex justify-center items-center mr-1">
                {counts?.unseen_messages || ""}
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
UserHeader.propTypes = {
  setActiveComponent: PropTypes.func.isRequired,
  updateUnseenMessagesCount: PropTypes.func,
};
export default UserHeader;
