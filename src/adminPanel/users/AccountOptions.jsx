import PropTypes from "prop-types";

const AccountOptions = ({ setActiveComponent, userinfo, setValue }) => {
  return (
    <div className="mt-5">
      <div className="flex justify-between dark:bg-gray-900 bg-gray-200 p-2 rounded-t-md mb-1">
        <span className="text-sm md:text-base font-medium">
          مدیریت حساب کاربری
        </span>
        <button onClick={() => setValue("mission")}>
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
            <path d="M12 8l-4 4l4 4" />
            <path d="M16 12h-8" />
            <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-2 text-xs md:text-sm">
        <div
          onClick={() => setActiveComponent("showinfo")}
          className="dark:bg-gray-900 bg-gray-200 py-5 w-full cursor-pointer px-2  relative transition-transform hover:scale-105 rounded-md group"
        >
          نمایش اطلاعات
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
            className="absolute end-2 top-4 group-hover:text-blue-500"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 10a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            <path d="M6 21v-1a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v1" />
            <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
          </svg>
        </div>
        <div
          className={`dark:bg-gray-900 bg-gray-200 py-5 w-full cursor-pointer px-2 transition-transform ${
            userinfo.remained_days < 14 && "hover:scale-105"
          } rounded-md relative flex flex-col group`}
        >
          <span>تمدید حساب</span>
          {userinfo.remained_days > 14 && (
            <span className="text-red-500 mt-2">غیرفعال</span>
          )}
        </div>
        
          <div onClick={()=>setActiveComponent("status")} 
          className="dark:bg-gray-900 bg-gray-200 py-5 w-full cursor-pointer px-2 transition-transform hover:scale-105 rounded-md relative group">
            فعال / غیرفعال کردن حساب
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
              className="absolute end-2 top-4 group-hover:text-blue-500"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
              <path d="M22 22l-5 -5" />
              <path d="M17 22l5 -5" />
            </svg>
          </div>
        
      </div>
    </div>
  );
};
AccountOptions.propTypes = {
  setActiveComponent: PropTypes.func.isRequired,
  userinfo: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired,
};
export default AccountOptions;
