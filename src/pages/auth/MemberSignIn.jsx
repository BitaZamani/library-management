import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
const MemberSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await signIn(email, password, "users");
    if (error) {
      toast.error(error);
    } else {
      nav("/");
    }
  };

  return (
    <div className="flex justify-around items-center bg-geo-img">
      <div className="flex justify-center items-center rounded-xl h-screen lg:w-[50vw]">
        <form
          className="shadow-md flex justify-center items-center flex-col w-[400px] h-[500px] dark:bg-gray-900 bg-gray-50"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center items-center flex-col m-4">
            <h2 className="text-4xl dark:text-gray-100">ورود</h2>
          </div>

          <div className="relative z-0 w-64 mb-10 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-blue-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer autofill:bg-transparent "
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-100 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-120 peer-focus:-translate-y-6"
            >
              ایمیل
            </label>
          </div>
          <div className="relative z-0 w-64 mb-5 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={password}
              minLength={8}
              maxLength={20}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-100 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-120 peer-focus:-translate-y-6"
            >
              رمز عبور
            </label>
          </div>
          <div className="text-base">
            <p className="p-2">
              رمز خود را فراموش کرده‌اید؟
              <NavLink to="resetpassword" className="hover:underline">
                فراموشی رمز
              </NavLink>
            </p>
            <p className="p-2">
              ثبت نام نکرده‌اید؟
              <NavLink to={"/signup"} className="hover:underline">
                ثبت نام
              </NavLink>
            </p>
          </div>
          <button
            className="p-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-3/4"
            type="submit"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemberSignIn;
