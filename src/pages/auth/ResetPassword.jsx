import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/resetpassword", { email });
      toast.success("ایمیل بازیابی ارسال شد.");
      nav("/signin");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-[400px] h-[200px] dark:bg-gray-900 bg-gray-300 p-5">
        <h2 className="text-xl font-bold text-center">بازیابی رمز عبور</h2>
        <input
          type="email"
          placeholder="ایمیل خود را وارد کنید."
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="p-2.5 text-sm text-gray-50 font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          ارسال ایمیل بازیابی
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
