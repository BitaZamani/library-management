import { useState, useEffect } from "react";
import { supabase } from "../services/supbase";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import Loading from "../components/loading";
const UserStatics = () => {
  const { user, info } = useAuth();
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const getUser = async () => {
    const user_id = user.id;
    setLoading(true);
    const { data, error } = await supabase
      .from("userstats")
      .select()
      .eq("user", user_id)
      .single();
    if (error) {
      console.log(error);
      return;
    }
    setLoading(false);
    setUserInfo(data);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <h1 className="my-5">{`${info.name} عزیز، خوش آمدی.`}</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
            <div className="relative bg-gray-200 dark:bg-gray-900 py-7 px-5 border border-gray-100 rounded-lg ">
              <span className="absolute inset-x-0 bottom-0 py-1 bg-gradient-to-r rounded-b-lg from-green-300 via-blue-500 to-purple-600"></span>
              <h2 className="text-2xl md:text-3xl font-bold pb-2">
                {userInfo.remained_days}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 pb-5 text-xs">
                روزهای باقی‌مانده از حساب شما
              </p>
              {userInfo.remained_days <= 3 && (
                <button className="absolute end-5 bottom-4 px-2 py-1 border dark:border-gray-200 border-gray-700  text-sm font-semibold rounded hover:bg-green-800 ">
                  درخواست تمدید حساب
                </button>
              )}
            </div>
            <div className="relative bg-gray-200 dark:bg-gray-900 py-7 px-5 border border-gray-100 rounded-lg ">
              <span className="absolute inset-x-0 bottom-0 py-1 bg-gradient-to-r rounded-b-lg from-green-300 via-blue-500 to-purple-600"></span>
              <h2 className="text-2xl md:text-3xl font-bold pb-2">{userInfo.all_books}</h2>
              <p className="text-gray-700 dark:text-gray-300 pb-5 text-xs">
                کتاب‌هایی که تا الان خوانده‌اید.
              </p>

              <NavLink
                to="/libraryexplorer"
                className="absolute end-5 bottom-4 px-2 py-1 text-sm flex"
              >
                کتاب‌های جدید
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
                  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l14 0" />
                  <path d="M5 12l4 4" />
                  <path d="M5 12l4 -4" />
                </svg>
              </NavLink>
            </div>
            <div className="relative bg-gray-200 dark:bg-gray-900 py-7 px-5 border border-gray-100 rounded-lg ">
              <span className="absolute inset-x-0 bottom-0 py-1 bg-gradient-to-r rounded-b-lg from-green-300 via-blue-500 to-purple-600"></span>
              <h2 className="text-2xl md:text-3xl font-bold pb-2">
                {userInfo.total_fines} <span className="text-base">ریال</span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300 pb-5 text-xs">
                جریمه‌های دیرکرد شما
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStatics;
