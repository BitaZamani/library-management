import PropTypes from "prop-types";

export const ShowInfo = ({ userinfo, setActiveComponent }) => {
  return (
    <div className="w-full mt-2">
      <div className="flex justify-between dark:bg-gray-900 bg-gray-200 p-2 rounded-t-md mb-1">
        <span className="text-sm md:text-base font-medium">
          مشاهده اطلاعات
        </span>
        <button onClick={() => setActiveComponent("menu")}>
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
      <div className="dark:bg-gray-900 bg-gray-200 p-2 rounded-b-md">
        <table className="text-right text-xs md:text-sm">
          <tbody>
            <tr>
              <th className="pl-2 py-2">نام و نام خانوادگی:</th>
              <td>{userinfo.name}</td>
            </tr>
            <tr>
              <th className="pl-2 py-2">شماره تماس:</th>
              <td>{userinfo.number}</td>
            </tr>
            <tr>
              <th className="pl-2 py-2">ایمیل:</th>
              <td>{userinfo.email}</td>
            </tr>
            <tr>
              <th className="pl-2 py-2">نام پدر:</th>
              <td>{userinfo.fname}</td>
            </tr>
            <tr>
              <th className="pl-2 py-2">تاریخ تولد:</th>
              <td>{new Date(userinfo.birthday).toLocaleDateString("fa")}</td>
            </tr>
            <tr>
              <th className="pl-2 py-2">آدرس:</th>
              <td>{userinfo.address}</td>
            </tr>
            <tr>
              <th className="pl-2 py-2">کارت ملی:</th>
              <td>مشاهده کارت ملی</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
ShowInfo.propTypes = {
  userinfo: PropTypes.array.isRequired,
  setActiveComponent: PropTypes.func.isRequired,
};
