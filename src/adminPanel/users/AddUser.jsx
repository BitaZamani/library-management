import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { supabase } from "../../services/supbase";
import { useAuth } from "../../context/AuthContext";
const AddUser = () => {
  const { user } = useAuth();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [fname, setFname] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profile, setProfile] = useState(null);
  const [id1, setID1] = useState(null);
  const [id2, setID2] = useState(null);
  const [password, setPassword] = useState("");
  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authUser = await createAuthUser();
      if (!authUser || !authUser.id) {
        toast.error("خطا");
        return;
      }
      await addUserToTable(authUser.id);
      toast.success("کاربر جدید با موفقیت ثبت شد.");
    } catch (error) {
      toast.error(error.message);
    }
    setID("");
    setName("");
    setFname("");
    setBirthday(null);
    setEmail("");
    setGender("");
    setNumber("");
    setAddress("");
    setProfile(null);
    setID1(null);
    setID2(null);
    setPassword(null);
  };

  const createAuthUser = async () => {
    try {
      const response = await axios.post("/api/createUser", {
        email,
        password,
      });
      return response.data.authData.user;
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };

  const addUserToTable = async (uuid) => {
    const profileURL = `https://cuxfjmqvtsgnjfiprsgb.supabase.co/storage/v1/object/public/users/users_profile/${id}.jpg`;
    const id1URL = `https://cuxfjmqvtsgnjfiprsgb.supabase.co/storage/v1/object/public/users/id_card/${id}_1.jpg`;
    const id2URL = `https://cuxfjmqvtsgnjfiprsgb.supabase.co/storage/v1/object/public/users/id_card/${id}_2.jpg`;
    try {
      const { error } = await supabase.storage
        .from("users")
        .upload(`users_profile/${id}.jpg`, profile, { upsert: true });
      if (error) {
        toast.error(error.message);
        return;
      }
      const { error1 } = await supabase.storage
        .from("users")
        .upload(`id_card/${id}_1.jpg`, id1, { upsert: true });
      if (error1) {
        toast.error(error1.message);
        return;
      }
      const { error2 } = await supabase.storage
        .from("users")
        .upload(`id_card/${id}_2.jpg`, id2, { upsert: true });
      if (error2) {
        toast.error(error2.message);
        return;
      }
      const { error: error3 } = await supabase.rpc("adduser", {
        added_by: user.id,
        address,
        birthday,
        email,
        fname,
        gender,
        id: uuid,
        id_card1: id1URL,
        id_card2: id2URL,
        id_number: id,
        name,
        number,
        profile: profileURL,
      });
      if (error3) {
        toast.error(error3.message);
        return;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      className="flex justify-center items-center flex-col w-4/5 m-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-سثئهbold mt-6">ثبت نام کاربر جدید</h2>
      <div className="w-full h-5 border-b-2 border-gray-700 dark:border-gray-300 text-center mt-5">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 dark:bg-gray-950 bg-gray-50 px-2">
          اطلاعات کاربری
        </span>
      </div>
      {/* {---------------------------} */}
      <div className="w-full max-w-xl mt-3">
        <label htmlFor="number" className="text-sm font-medium">
          تلفن همراه
        </label>
        <input
          className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          id="number"
          type="text"
          value={number}
          onChange={(e) => {
            if (e.target.value === "" || /^\d*$/.test(e.target.value)) {
              setNumber(e.target.value);
            }
          }}
          required
          maxLength={11}
        />
      </div>
      {/* {---------------------------} */}
      <div className="w-full max-w-xl mt-3">
        <label htmlFor="email" className="text-sm font-medium">
          ایمیل
        </label>
        <input
          id="email"
          type="email"
          className="bg-gray-100 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {/* {---------------------------} */}
      <div className="w-full max-w-xl mt-3 relative">
        <label htmlFor="password" className="text-sm font-medium">
          رمز عبور
        </label>
        <input
          id="password"
          type={visiblePassword ? "password" : "text"}
          className="bg-gray-100 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
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
      {/* {---------------------------} */}
      <div className="w-full h-5 border-b-2 border-gray-700 dark:border-gray-300 text-center mt-5">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 dark:bg-gray-950 bg-gray-50 px-2">
          اطلاعات شناسنامه‌ای
        </span>
      </div>
      <div className="w-full max-w-xl mt-3">
        <label htmlFor="name" className="text-sm font-medium">
          نام و نام خانوادگی
        </label>
        <input
          id="name"
          type="text"
          className="bg-gray-100 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          value={name}
          onChange={(e) => {
            if (/^[\u0600-\u06FF\s]*$/.test(e.target.value)) {
              setName(e.target.value);
            }
          }}
          required
          maxLength={100}
        />
      </div>
      {/* {---------------------------} */}
      <div className="flex justify-center items-center w-full max-w-xl mt-3">
        <div className="w-1/2">
          <label htmlFor="birthday" className="text-sm font-medium">
            تاریخ تولد
          </label>
          <input
            type="date"
            className="bg-gray-100 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            id="birthday"
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
        <div className="w-1/2 max-w-xl mr-3">
          <label htmlFor="gender" className="text-sm font-medium">
            جنسیت
          </label>
          <select
            id="gender"
            className="bg-gray-100 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value={"زن"}>زن</option>
            <option value={"مرد"}>مرد</option>
          </select>
        </div>
      </div>

      {/* {---------------------------} */}
      <div className="w-full max-w-xl mt-3">
        <label htmlFor="id" className="text-sm font-medium">
          کد ملی
        </label>
        <input
          id="id"
          type="text"
          className="bg-gray-100 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          value={id}
          onChange={(e) => {
            if (e.target.value === "" || /^\d*$/.test(e.target.value)) {
              setID(e.target.value);
            }
          }}
          required
          maxLength={10}
        />
      </div>
      {/* {---------------------------} */}
      <div className="w-full max-w-xl mt-3">
        <label htmlFor="fname" className="mb-2 text-sm font-medium">
          نام پدر
        </label>

        <input
          id="fname"
          type="text"
          className="bg-gray-100 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          value={fname}
          onChange={(e) => {
            if (/^[\u0600-\u06FF\s]*$/.test(e.target.value)) {
              setFname(e.target.value);
            }
          }}
          required
          maxLength={50}
        />
      </div>
      {/* {---------------------------} */}
      <div className="w-full h-5 border-b-2 border-gray-700 dark:border-gray-300 text-center mt-5">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 dark:bg-gray-950 bg-gray-50 px-2">
          اطلاعات تکمیلی
        </span>
      </div>
      <div className="w-full max-w-xl mt-3">
        <label htmlFor="img" className="text-sm font-medium">
          عکس پرسنلی
        </label>
        <input
          className="block w-full p-2.5 text-sm  border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="img"
          type="file"
          onChange={(e) => {
            setProfile(e.target.files[0]);
          }}
        />
      </div>
      <div className="w-full max-w-xl mt-3">
        <label htmlFor="id1" className="text-sm font-medium">
          اسکن صفحه اول کارت ملی
        </label>
        <input
          type="file"
          className="block w-full p-2.5 text-sm  border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="id1"
          onChange={(e) => {
            setID1(e.target.files[0]);
          }}
        />
      </div>
      <div className="w-full max-w-xl mt-3">
        <label htmlFor="id2" className="text-sm font-medium">
          اسکن صفحه دوم کارت مل
        </label>
        <input
          className="block w-full p-2.5 text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="id2"
          type="file"
          onChange={(e) => {
            setID2(e.target.files[0]);
          }}
        />
      </div>

      <div className="w-full max-w-xl mt-3">
        <label htmlFor="address" className="text-sm font-medium">
          آدرس
        </label>

        <textarea
          id="address"
          type="text"
          rows={4}
          className="bg-gray-100 border border-gray-300  text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          value={address}
          onChange={(e) => {
            if (/^[\u0600-\u06FF\s\d]*$/.test(e.target.value)) {
              setAddress(e.target.value);
            }
          }}
          required
          maxLength={200}
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 text-lg font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-10 w-full max-w-xl m-8"
      >
        ثبت نام
      </button>
    </form>
  );
};

export default AddUser;
