import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const location = useLocation();

  useEffect(() => {
    const hashParams = new URLSearchParams(location.hash.substring(1));
    const token = hashParams.get("access_token");
    if (token) {
      setAccessToken(token);
    } else {
      toast.error("Access token is missing.");
    }
  }, [location]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/updatepassword", { accessToken, newPassword });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-[400px] h-[300px] dark:bg-gray-900 bg-gray-300 p-5">
        <h2 className="text-xl font-bold">بازیابی رمز عبور</h2>
        <input
          type="password"
          placeholder="پسورد جدید"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="تکرار پسورد جدید"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5"
          value={newPassword}
          onChange={(e) => setNewPassword2(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          بازیابی رمز
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
