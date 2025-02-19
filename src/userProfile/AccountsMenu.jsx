import PropTypes from "prop-types";

const AccountsMenu = ({ setActiveComponent }) => {
  return (
    <div>
      <div
        className="dark:bg-gray-900 bg-gray-200 my-2 md:ml-5 relative group w-full cursor-pointer p-2 transition-transform hover:scale-105 rounded-md"
        onClick={() => setActiveComponent("personalinfo")}
      >
        <h2 className="text-sm md:text-base font-bold">
          مشاهده و ویرایش اطلاعات هویتی
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:text-blue-300 absolute end-3 top-2"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
          <path d="M11 14h1v4h1" />
          <path d="M12 11h.01" />
        </svg>
      </div>
      <div
        className="dark:bg-gray-900 bg-gray-200 my-2 md:ml-5 relative group w-full cursor-pointer p-2 transition-transform hover:scale-105 rounded-md"
        onClick={() => setActiveComponent("accountinfo")}
      >
        <h2 className="text-sm md:text-base font-bold">
          مشاهده و ویرایش اطلاعات کاربری
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:text-blue-300 absolute end-3 top-2"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
          <path d="M11 14h1v4h1" />
          <path d="M12 11h.01" />
        </svg>
      </div>
      <div
        className="dark:bg-gray-900 bg-gray-200 my-2 md:ml-5 relative group w-full cursor-pointer p-2 transition-transform hover:scale-105 rounded-md"
        onClick={() => setActiveComponent("finance")}
      >
        <h2 className="text-sm md:text-base font-bold">مشاهده اطلاعات مالی</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:text-blue-300 absolute end-3 top-2"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
          <path d="M11 14h1v4h1" />
          <path d="M12 11h.01" />
        </svg>
      </div>
    </div>
  );
};
AccountsMenu.propTypes = {
  setActiveComponent: PropTypes.func.isRequired,
};
export default AccountsMenu;
