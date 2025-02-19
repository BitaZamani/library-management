import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { supabase } from "../services/supbase";

const AdminInfo = () => {
  const { info, user, setInfo } = useAuth();
  const [newEmail, setNewEmail] = useState(info.email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const userId = user.id;
  const [edit, setEdit] = useState(false);
  const [userInfo, setUserInfo] = useState(info);
  const handleEditInfo = async () => {
    if (JSON.stringify(userInfo) === JSON.stringify(info)) {
      toast.error("هیچ تغییری اعمال نشده است.");
      setEdit(false);
      return;
    }
    editInfo();
  };
  const editInfo = async () => {
    try {
      const { error: updateError } = await supabase
        .from("staff")
        .update(userInfo)
        .eq("id", user.id);
      if (updateError) {
        toast.error(updateError.message);
        return;
      }
      setInfo(userInfo);
      toast.success("اطلاعات با موفقیت به‌روزرسانی شد.");
      setEdit(false);
    } catch (error) {
      toast.error(error.message);
    }
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

      const { error: changeError } = await supabase
        .from("staff")
        .update({ email: newEmail });

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
  const handleEditEmail = async () => {
    if (newEmail === info.email) {
      toast.error("هیچ تغییری اعمال نشده است.");
      setEditEmail(false);
      return;
    }
    updateEmail();
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
  useEffect(() => {
    setUserInfo(info);
  }, [info]);
  return (
    <div className="text-xs md:text-sm w-11/12 mx-auto">
      <h1 className="text-lg font-semibold">مشاهده و ویرایش اطلاعات</h1>

      <div className="dark:bg-gray-900 bg-gray-200 p-2 rounded-b-md my-2">
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
      </div>
      <div className="dark:bg-gray-900 bg-gray-200 my-2 rounded-b-md p-2">
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

export default AdminInfo;
