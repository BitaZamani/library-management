import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { supabase } from "../services/supbase";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
export const Hero = () => {
  const { user } = useAuth();
  const [info, setInfo] = useState([]);
  const getLibraryInfo = async () => {
    const { data, error } = await supabase
      .from("libraryinfo")
      .select()
      .single();
    if (error) {
      toast.error(error.message);
      return;
    }
    setInfo(data);
  };
  useEffect(() => {
    getLibraryInfo();
  }, []);
  return (
    <div className="w-4/5 mx-auto flex flex-col justify-center lg:justify-evenly mt-36">
      <div className="flex justify-center items-center flex-col">
        <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl w-full h-full text-center leading-relaxed lg:leading-normal">
          به کتابخانه <span className="text-blue-500 underline">دانش</span> خوش
          آمدید.
        </h1>
        <p className="mb-2 text-sm font-normal text-gray-500 lg:text-base dark:text-gray-400">
          مجموعه‌ای بزرگ از هر چیزی که نیاز دارید.
        </p>
        <div className="flex flex-col w-80">
          {!user && (
            <Link to="/signup" className="w-full m-2">
              <button className="w-full inline-flex justify-center items-center py-3 px-5 text-sm lg:text-base font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                ثبت نام
              </button>
            </Link>
          )}
          <Link to="/libraryexplorer" className="w-full m-2">
            <button className="w-full inline-flex justify-center items-center py-3 px-5 text-sm lg:text-base font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              جستجو
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly pt-16">
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
            className="text-blue-500"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
          </svg>
          <span className="text-base px-2 dark:text-gray-400">
            {info.active_users} کاربر فعال
          </span>
        </div>
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
            className="text-green-400"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
            <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
            <path d="M5 8h4" />
            <path d="M9 16h4" />
            <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" />
            <path d="M14 9l4 -1" />
            <path d="M16 16l3.923 -.98" />
          </svg>
          <span className="text-base px-2 dark:text-gray-400">
            بیش از {info.total_books} کتاب
          </span>
        </div>
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
            className="text-yellow-400"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 19c3.333 -2 5 -4 5 -6c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 2.877 2.5 4c1.5 2 2.5 2.5 3.5 1c.667 -1 1.167 -1.833 1.5 -2.5c1 2.333 2.333 3.5 4 3.5h2.5" />
            <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
            <path d="M16 7h4" />
          </svg>
          <span className="text-base px-2 dark:text-gray-400">
            آثار {info.total_authors} نویسنده و مترجم
          </span>
        </div>
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
            className="text-purple-400"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3l3 6l6 3l-6 3l-3 6l-3 -6l-6 -3l6 -3z" />
          </svg>
          <span className="text-base px-2 dark:text-gray-400">
            جستجو در 5 طبقه‌بندی و {info.total_tags} زیرمجموعه
          </span>
        </div>
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
            className="text-amber-600"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 21h18" />
            <path d="M19 21v-4" />
            <path d="M19 17a2 2 0 0 0 2 -2v-2a2 2 0 1 0 -4 0v2a2 2 0 0 0 2 2z" />
            <path d="M14 21v-14a3 3 0 0 0 -3 -3h-4a3 3 0 0 0 -3 3v14" />
            <path d="M9 17v4" />
            <path d="M8 13h2" />
            <path d="M8 9h2" />
          </svg>
          <span className="text-base px-2 dark:text-gray-400">
            دسترسی به آثار {info.total_publishers} ناشر
          </span>
        </div>
      </div>
    </div>
  );
};
