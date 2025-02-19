import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { supabase } from "../services/supbase";
import axios from "axios";
import PropTypes from "prop-types";

const EditAccountInfo = ({ setActiveComponent }) => {
  const { info, user, setInfo } = useAuth();
  const [newEmail, setNewEmail] = useState(info.email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const userId = user.id;
  const handleEditEmail = async () => {
    if (newEmail === info.email) {
      toast.error("هیچ تغییری اعمال نشده است.");
      setEditEmail(false);
      return;
    }
    setShowModal(true);
  };
  const updateEmail = async () => {
    try {
      const res = await axios.post("/api/updateemail", {
        userId,
        newEmail,
      });
      if (res.data.error) {
        toast.error(res.data.error);
        return;
      }

      const { error: changeError } = await supabase.rpc("updateemail", {
        new_email: newEmail,
        user_id: user.id,
      });

      if (changeError) {
        toast.error(changeError.message);
        return;
      }

      toast.success("ایمیل جدید تأیید شد.");
      setInfo({ ...info, email: newEmail });
    } catch (error) {
      toast.error(error.message);
    }
  };
  const updatePassword = async () => {
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      toast.error(updateError.message);
      return;
    }
    toast.success("رمز عبور با موفقیت به روزرسانی شد.");
    const { error } = await supabase.from("notifications").insert({
      user_id: userId,
      message: "رمز شما به روزرسانی شد.",
      header: "تغییر اطلاعات کاربری",
      time: new Date().toISOString(),
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    setEditPassword(false);
  };
  const handleEditPassword = async () => {
    if (newPassword !== confirmedPassword) {
      toast.error("رمز وارد شده و رمز تایید شده تفاوت دارند.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("طول رمز عبور نباید کمتر از 8 باشد.");
      return;
    }
    updatePassword();
  };
  return (
    <div className="text-xs md:text-sm relative">
      <div className="flex justify-between dark:bg-gray-900 bg-gray-200 p-2 rounded-t-md mb-1">
        <span className="text-sm font-medium">
          مشاهده و ویرایش اطلاعات کاربری
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
      <div className="dark:bg-gray-900 bg-gray-200 p-2">
        <div className="flex flex-col">
          <label>ایمیل</label>
          <input
            type="email"
            value={newEmail}
            readOnly={!editEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
            className="w-1/2 lg:w-1/4 text-end dark:bg-gray-900 bg-gray-200 ps-1 outline-none border-b border-gray-400 dark:border-gray-500 dark:text-gray-300 text-gray-700 dark:focus:border-blue-400 dark:focus:text-blue-400 focus:border-blue-600 focus:text-blue-600"
          />
        </div>
        <div className="mt-5">
          {editEmail ? (
            <>
              <button
                onClick={() => {
                  setEditEmail(false);
                  setNewEmail(info.email);
                }}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 rounded-lg text-xs px-4 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                لغو
              </button>
              <button
                onClick={handleEditEmail}
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 rounded-lg text-xs px-4 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                تایید
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditEmail(true)}
              className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-xs px-3 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              ویرایش
            </button>
          )}
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-96">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                آیا مطمئن هستید؟
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                در ویرایش ایمیل خود دقت کنید. ایمیل شما، نام کاربری شما برای
                ورود به حساب است. در صورت استفاده از ایمیل نادرست ممکن است
                دسترسی به حساب خود را از دست بدهید.
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 px-4 py-2"
                >
                  لغو
                </button>
                <button
                  onClick={updateEmail}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  تایید
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="dark:bg-gray-900 bg-gray-200 mt-1 rounded-b-md p-2">
        {editPassword ? (
          <>
            <div className="flex flex-col md:flex-row">
              <input
                type="password"
                value={newPassword}
                placeholder="رمز جدید"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                className="w-1/2 lg:w-1/4 text-start dark:bg-gray-800 bg-gray-300 ps-1 outline-none border border-gray-400 dark:border-gray-500 dark:text-gray-300 text-gray-700 dark:focus:border-blue-400 dark:focus:text-blue-400 focus:border-blue-600 focus:text-blue-600 m-2 py-1"
              />
              <input
                type="password"
                value={confirmedPassword}
                placeholder="تکرار رمز جدید"
                onChange={(e) => {
                  setConfirmedPassword(e.target.value);
                }}
                className="w-1/2 lg:w-1/4 text-start dark:bg-gray-800 bg-gray-300 ps-1 outline-none border border-gray-400 dark:border-gray-500 dark:text-gray-300 text-gray-700 dark:focus:border-blue-400 dark:focus:text-blue-400 focus:border-blue-600 focus:text-blue-600 m-2 py-1"
              />
            </div>
            <div className="flex mt-4">
              <button
                onClick={() => setEditPassword(false)}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 rounded-lg text-xs px-4 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                لغو
              </button>
              <button
                onClick={handleEditPassword}
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 rounded-lg text-xs px-4 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                تایید
              </button>
            </div>
          </>
        ) : (
          <button onClick={() => setEditPassword(true)}>تغییر رمز عبور</button>
        )}
      </div>
    </div>
  );
};
EditAccountInfo.propTypes = {
  setActiveComponent: PropTypes.func.isRequired,
};
export default EditAccountInfo;
