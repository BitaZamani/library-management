import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supbase";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const EditPersonalInfo = ({ setActiveComponent }) => {
  const { info, setInfo } = useAuth();
  const [edit, setEdit] = useState(false);
  const [userInfo, setUserInfo] = useState(info);
  const [showModal, setShowModal] = useState(false);
  const handleEditInfo = async () => {
    if (JSON.stringify(userInfo) === JSON.stringify(info)) {
      toast.error("هیچ تغییری اعمال نشده است.");
      setEdit(false);
      return;
    }
    setShowModal(true);
  };
  const editInfo = async () => {
    try {
      const { error: updateError } = await supabase
        .from("users")
        .update(userInfo)
        .eq("id_number", info.id_number);
      if (updateError) {
        toast.error(updateError.message);
        return;
      }
      setInfo(userInfo);
      setShowModal(false);
      toast.success("اطلاعات با موفقیت به‌روزرسانی شد.");
      setEdit(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    setUserInfo(info);
  }, [info]);

  return (
    <div className="text-xs md:text-sm relative">
      <div className="flex justify-between dark:bg-gray-900 bg-gray-200 p-2 rounded-t-md">
        <span className="text-sm font-medium">
          مشاهده و ویرایش اطلاعات هویتی
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-square-arrow-left"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 8l-4 4l4 4" />
            <path d="M16 12h-8" />
            <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
          </svg>
        </button>
      </div>
      <div className="dark:bg-gray-900 bg-gray-200 p-2 rounded-b-md mt-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-2">
          <div className="flex flex-col">
            <label className="py-2 font-medium" htmlFor="name">
              نام و نام خانوادگی
            </label>
            <input
              type="text"
              id="name"
              value={userInfo.name}
              readOnly={!edit}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  name: e.target.value,
                })
              }
              className="w-1/2 dark:bg-gray-900 bg-gray-200 ps-1 outline-none border-b border-gray-400 dark:border-gray-500 dark:text-gray-300 text-gray-700 dark:focus:border-blue-400 dark:focus:text-blue-400 focus:border-blue-600 focus:text-blue-600"
            />
          </div>
          <div className="flex flex-col">
            <label className="py-2 font-medium">تلفن همراه</label>
            <input
              type="text"
              value={userInfo.number}
              readOnly={!edit}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  number: e.target.value,
                })
              }
              className="w-1/2 dark:bg-gray-900 bg-gray-200 ps-1 outline-none border-b border-gray-400 dark:border-gray-500 dark:text-gray-300 text-gray-700 dark:focus:border-blue-400 dark:focus:text-blue-400 focus:border-blue-600 focus:text-blue-600"
            />
          </div>
          <div className="flex flex-col">
            <label className="py-2 font-medium">تاریخ تولد </label>
            {edit ? (
              <input
                type="date"
                value={userInfo.birthday}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    birthday: e.target.value,
                  })
                }
                className="w-1/2 dark:bg-gray-900 bg-gray-200 ps-1 outline-none border-b border-gray-400 dark:border-gray-500 dark:text-gray-300 text-gray-700 dark:focus:border-blue-400 dark:focus:text-blue-400 focus:border-blue-600 focus:text-blue-600"
              />
            ) : (
              <span className="w-1/2 dark:bg-gray-900 bg-gray-200 ps-1 outline-none border-b border-gray-400 dark:border-gray-500 dark:text-gray-300 text-gray-700 dark:focus:border-blue-400 dark:focus:text-blue-400 focus:border-blue-600 focus:text-blue-600">
                {new Date(userInfo.birthday).toLocaleDateString("fa")}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="py-2 font-medium">کد ملی </label>
            <input
              type="text"
              value={userInfo.id_number}
              readOnly={!edit}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  id_number: e.target.value,
                })
              }
              className="w-1/2 dark:bg-gray-900 bg-gray-200 ps-1 outline-none border-b border-gray-400 dark:border-gray-500 dark:text-gray-300 text-gray-700 dark:focus:border-blue-400 dark:focus:text-blue-400 focus:border-blue-600 focus:text-blue-600"
            />
          </div>
          <div className="flex flex-col">
            <label className="py-2 font-medium">جنسیت</label>
            {edit ? (
              <select
                id="gender"
                className="w-1/2 dark:bg-gray-900 bg-gray-200 ps-1 outline-none border-b border-gray-400 dark:border-gray-500 dark:text-gray-300 text-gray-700 dark:focus:border-blue-400 dark:focus:text-blue-400 focus:border-blue-600 focus:text-blue-600"
                value={userInfo.gender}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    gender: e.target.value,
                  })
                }
              >
                <option value="زن">زن</option>
                <option value="مرد">مرد</option>
              </select>
            ) : (
              <span className="w-1/2 dark:bg-gray-900 bg-gray-200 ps-1 outline-none border-b border-gray-400 dark:border-gray-500 dark:text-gray-300 text-gray-700 dark:focus:border-blue-400 dark:focus:text-blue-400 focus:border-blue-600 focus:text-blue-600">
                {userInfo.gender}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="py-2 font-medium">نام پدر </label>
            <input
              type="text"
              value={userInfo.fname}
              readOnly={!edit}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  fname: e.target.value,
                })
              }
              className="w-1/2 dark:bg-gray-900 bg-gray-200 ps-1 outline-none border-b border-gray-400 dark:border-gray-500 dark:text-gray-300 text-gray-700 dark:focus:border-blue-400 dark:focus:text-blue-400 focus:border-blue-600 focus:text-blue-600"
            />
          </div>
          <div className="flex flex-col">
            <label className="py-2 font-medium">آدرس</label>
            <input
              type="text"
              value={userInfo.address}
              readOnly={!edit}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  address: e.target.value,
                })
              }
              className="w-1/2 dark:bg-gray-900 bg-gray-200 ps-1 outline-none border-b border-gray-400 dark:border-gray-500 dark:text-gray-300 text-gray-700 dark:focus:border-blue-400 dark:focus:text-blue-400 focus:border-blue-600 focus:text-blue-600"
            />
          </div>
        </div>
        <div className="flex justify-end mt-7">
          {edit ? (
            <>
              <button
                onClick={() => {
                  setEdit(false);
                  setUserInfo(info);
                }}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 rounded-lg text-xs px-4 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                لغو
              </button>
              <button
                onClick={handleEditInfo}
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 rounded-lg text-xs px-4 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                تایید
              </button>
            </>
          ) : (
            <button
              onClick={() => setEdit(true)}
              className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-xs px-4 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              ویرایش اطلاعات
            </button>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              آیا مطمئن هستید؟
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              در ویرایش اطلاعات خود دقت کنید. در صورت استفاده از اطلاعات نادرست،
              حساب شما غیرفعال خواهد شد.
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 px-4 py-2"
              >
                لغو
              </button>
              <button
                onClick={editInfo}
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
EditPersonalInfo.propTypes = {
  setActiveComponent: PropTypes.func.isRequired,
};
export default EditPersonalInfo;
