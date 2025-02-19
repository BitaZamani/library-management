import { useEffect, useState } from "react";
import { supabase } from "../../services/supbase.js";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import { Borrow } from "./UserServicesBorrow.jsx";
import { ReturnAndRenew } from "./UserServiceRe.jsx";
import AccountInfo from "./AccountInfo.jsx";
import { UserDebts } from "./UserServicesDebts.jsx";
import Search from "../../components/Search.jsx";
const UserServices = () => {
  const { user } = useAuth();
  const staff_id = user.id;
  const [value, setValue] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [userID, setUserID] = useState("");
  const getUser = async () => {
    if (userID.trim().length !== 10) {
      toast.error("کد ملی را درست وارد کنید.");
      return;
    }
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id_number", userID)
        .maybeSingle();
      if (error) {
        toast.error(error.message);
        return;
      }

      if (!data) {
        toast.error("کاربر یافت نشد.");
        return;
      }

      setUserInfo(data);
      setValue("mission");
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (userID.trim() === "") {
      setUserInfo("");
      setValue("");
    }
  }, [userID]);

  return (
    <div className="flex flex-col w-4/5 mx-auto my-auto">
      <h1 className="text-lg font-semibold">خدمات کاربران</h1>
      <div className="w-full">
        <Search
          value={userID}
          setValue={setUserID}
          handleSearch={getUser}
          searchName={"کد ملی"}
        />
      </div>
      <div className="p-1 mt-2 text-sm w-full">
        {value === "mission" && (
          <div className="flex flex-col w-full">
            <div className="flex items-center">
              <img
                src={userInfo.profile}
                className="w-12 h-12 rounded-full ml-2"
              />
              <span>{userInfo.name}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
              <div
                className="dark:bg-gray-900 bg-gray-200 w-full cursor-pointer py-4 px-2 transition-transform hover:scale-105 rounded-md border border-gray-700 dark:border-gray-400 hover:border-blue-500 dark:hover:border-blue-500"
                onClick={() => setValue("books")}
              >
                <h2 className="text-sm md:text-base font-medium">
                  مدیریت کتاب‌ها
                </h2>
                <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                  تمدید کتاب - برگشت کتاب - تسویه تاخیر
                </span>
              </div>
              <div
                className="dark:bg-gray-900 bg-gray-200 w-full cursor-pointer py-4 px-2 transition-transform hover:scale-105 rounded-md border border-gray-700 dark:border-gray-400 hover:border-blue-500 dark:hover:border-blue-500"
                onClick={() => setValue("borrow")}
              >
                <h2 className="text-sm md:text-base font-medium"> امانت</h2>
                <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                  مدیریت کتاب‌های رزرو شده - امانت کتاب
                </span>
              </div>

              <div
                className="dark:bg-gray-900 bg-gray-200 w-full cursor-pointer py-4 px-2 transition-transform hover:scale-105 rounded-md border border-gray-700 dark:border-gray-400 hover:border-blue-500 dark:hover:border-blue-500"
                onClick={() => setValue("accountinfo")}
              >
                <h2 className="text-sm md:text-base font-medium">
                  حساب کاربری
                </h2>
                <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                  تمدید حساب - مشاهده اطلاعات - فعال / غیرفعال کردن حساب
                </span>
              </div>
              <div
                className="dark:bg-gray-900 bg-gray-200 w-full cursor-pointer py-4 px-2 transition-transform hover:scale-105 rounded-md border border-gray-700 dark:border-gray-400 hover:border-blue-500 dark:hover:border-blue-500"
                onClick={() => setValue("fines")}
              >
                <h2 className="text-sm md:text-base font-medium">
                  حساب مالی کاربر
                </h2>
                <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                  مشاهده فعالیت‌ها - مشاهده ریز بدهی‌ها - تسویه بدهی
                </span>
              </div>
            </div>
          </div>
        )}
        {value === "books" && (
          <ReturnAndRenew
            staff_id={staff_id}
            setValue={setValue}
            userID={userID}
            user_id={userInfo.id}
          />
        )}
        {value === "borrow" && (
          <Borrow
            staff_id={staff_id}
            setValue={setValue}
            user_id={userInfo.id}
          />
        )}
        {value === "accountinfo" && (
          <AccountInfo userinfo={userInfo} setValue={setValue} />
        )}
        {value == "fines" && (
          <UserDebts userID={userID} uid={userInfo.id} setValue={setValue} />
        )}
      </div>
    </div>
  );
};

export default UserServices;
