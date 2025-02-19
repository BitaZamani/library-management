import { NavLink } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-2xl md:text-4xl font-semibold mb-1">
        دسترسی غیرمجاز
      </h2>
      <p className="text-sm md:text-base text-gray-800 mb-5">
        شما در حال تلاش برای دسترسی به بخش‌های غیرمجاز هستید.
      </p>
      <button className="inline-flex justify-center items-center py-3 px-5 text-sm lg:text-base font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
        ّ
        <NavLink to="/" className="flex items-center justify-center">
          برگشت به خانه
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
      </button>
    </div>
  );
};

export default Unauthorized;
