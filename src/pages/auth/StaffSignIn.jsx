import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
const StaffSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };
  const { signIn } = useAuth();
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await signIn(email, password, "staff");
    if (error) {
      toast.error(error);
      return;
    }
    nav("/");
  };
  useEffect(() => {
    setVisiblePassword(false);
  }, []);
  return (
    <div className="lg:flex lg:justify-around lg:items-center lg:flex-row">
      <div className="flex justify-center items-center rounded-xl h-screen lg:w-[50vw]">
        <form
          className="shadow-md flex justify-center items-center flex-col w-[400px] h-[500px] dark:bg-gray-900 bg-gray-50"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center items-center flex-col m-4">
            <h2 className="text-4xl">ورود</h2>
          </div>
          <div className="relative z-0 w-64 mb-10 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-blue-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer autofill:bg-transparent "
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-100 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-120 peer-focus:-translate-y-6"
            >
              ایمیل
            </label>
          </div>
          <div className="relative z-0 w-64 mb-10 group">
            <input
              type={visiblePassword ? "text" : "password"}
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
            {!visiblePassword ? (
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
                className="absolute end-1 bottom-2.5"
                onClick={togglePasswordVisibility}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
              </svg>
            ) : (
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
                className="absolute end-1 bottom-2.5"
                onClick={togglePasswordVisibility}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                <path d="M3 3l18 18" />
              </svg>
            )}
          </div>
          <p className="mb-5">
            رمز خود را فراموش کرده‌اید؟
            <NavLink to="resetpassword" className="hover:underline">
              فراموشی رمز
            </NavLink>
          </p>
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

export default StaffSignIn;
