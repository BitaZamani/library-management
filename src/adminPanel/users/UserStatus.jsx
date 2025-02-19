import toast from "react-hot-toast";
import { supabase } from "../../services/supbase";
import { useState } from "react";
import PropTypes from "prop-types";

const UserStatus = ({ userinfo, setActiveComponent }) => {
  const [showActiveModal, setShowActiveModal] = useState(false);
  const [showDeActiveModal, setShowDeActiveModal] = useState(false);
  const activateUser = async () => {
    let { error } = await supabase.rpc("activeuser", {
      user_id_number: userinfo.id_number,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    setShowActiveModal(false);
    toast.success("کاربر فعال شد.");
  };
  const deActivateUser = async () => {
    let { error } = await supabase.rpc("deactiveuser", {
      user_id_number: userinfo.id_number,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    setShowDeActiveModal(false);
    toast.success("کاربر غیرفعال شد.");
  };
  return (
    <div>
      <div className="flex justify-between dark:bg-gray-900 bg-gray-200 p-2 rounded-t-md mt-2">
        <span className="text-sm font-medium">فعال/غیرفعال‌سازی حساب</span>
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-square-arrow-left"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 8l-4 4l4 4" />
            <path d="M16 12h-8" />
            <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
          </svg>
        </button>
      </div>
      <div className="flex justify-between dark:bg-gray-900 bg-gray-200 p-2 rounded-b-md mt-2">
        {userinfo.status != 1 ? (
          <div className="flex flex-col">
            <span>وضعیت حساب: فعال</span>
            <button
              onClick={() => setShowDeActiveModal(true)}
              className="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              غیرفعال‌سازی حساب
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <span>وضعیت حساب: غیرفعال</span>
            <button
              onClick={() => setShowActiveModal(true)}
              className="mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              فعال‌سازی حساب
            </button>
          </div>
        )}
      </div>
      {showActiveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              آیا مطمئن هستید؟
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <span>
                {`شما در حال فعالسازی حساب کاربر ${userinfo.name} به کد ملی ${userinfo.id_number} هستید.
`}
              </span>
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowActiveModal(false)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 px-4 py-2"
              >
                لغو
              </button>
              <button
                onClick={activateUser}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                تایید
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeActiveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              آیا مطمئن هستید؟
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <span>
                {`شما در حال غیرفعالسازی حساب کاربر ${userinfo.name} به کد ملی ${userinfo.id_number} هستید.
`}
              </span>
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeActiveModal(false)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 px-4 py-2"
              >
                لغو
              </button>
              <button
                onClick={deActivateUser}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                تایید
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
UserStatus.propTypes = {
  userinfo: PropTypes.object.isRequired,
  setActiveComponent: PropTypes.func.isRequired,
};
export default UserStatus;
