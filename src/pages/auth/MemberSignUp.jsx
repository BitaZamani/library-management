import { useState } from "react";
import { supabase } from "../../services/supbase";
import toast from "react-hot-toast";
const MemberSignUp = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUserToTable();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addUserToTable = async () => {
    const profileURL = `https://cuxfjmqvtsgnjfiprsgb.supabase.co/storage/v1/object/public/users/new_users/${id}_0.jpg`;
    const id1URL = `https://cuxfjmqvtsgnjfiprsgb.supabase.co/storage/v1/object/public/users/new_users/${id}_1.jpg`;
    const id2URL = `https://cuxfjmqvtsgnjfiprsgb.supabase.co/storage/v1/object/public/users/new_users/${id}_2.jpg`;
    try {
      const { error } = await supabase.storage
        .from("users")
        .upload(`new_users/${id}_0.jpg`, profile);
      if (error) {
        toast.error(error.message);
        console.log(error);
        return;
      }
      const { error1 } = await supabase.storage
        .from("users")
        .upload(`new_users/${id}_1.jpg`, id1);
      if (error1) {
        toast.error(error1.message);
        return;
      }
      const { error2 } = await supabase.storage
        .from("users")
        .upload(`new_users/${id}_2.jpg`, id2);
      if (error2) {
        toast.error(error2.message);
        return;
      }
      const { error: e1 } = await supabase.from("new_users").insert({
        name,
        address,
        gender,
        fname,
        email,
        inserted_at: new Date().toISOString(),
        number,
        birthday,
        id_number: id,
        profile: profileURL,
        id_card1: id1URL,
        id_card2: id2URL,
      });
      if (e1) {
        console.log(e1);
        return;
      }
      toast.success("درخواست شما با موفقیت ثبت شد.");
      setAddress("");
      setBirthday(null);
      setEmail("");
      setFname("");
      setGender("");
      setID(null);
      setID2(null);
      setName("");
      setNumber("");
      setProfile(null);
      setID("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-4/5 mx-auto my-3">
      <div className="flex items-center justify-center">
        <h1 className="text-2xl dark:text-gray-50"> ثبت نام</h1>
      </div>
      <ul className="list-disc">
        <li className="py-1 dark:text-gray-100 text-sm md:text-base">
          اطلاعات خود را به درستی وارد کنید.
        </li>
        <li className="py-1 dark:text-gray-100 text-sm md:text-base">
          بعد از ثبت اطلاعات طی یک هفته همراه با مدارک شناسایی به کتابخانه
          مراجعه کرده و با ارائه مدارک کارت عضویت خود را دریافت کنید.
        </li>
        <li className="py-1 dark:text-gray-100 text-sm md:text-base">
          ایمیل خود را درست وارد کنید. ایمیل شما نام کاربری شماست.
        </li>
      </ul>
      <form
        className="flex justify-center md:items-start items-center flex-col w-full"
        onSubmit={handleSubmit}
      >
        <div className="w-full h-5 border-b-2 dark:border-gray-800 text-center mt-3 mb-7">
          <span className="text-md font-medium dark:bg-gray-950 bg-gray-100 dark:text-gray-50 px-2">
            اطلاعات کاربری
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-x-5">
          <div className="relative z-0 w-64 mb-10 group">
            <label
              htmlFor="number"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              شماره تماس
            </label>
            <input
              type="text"
              id="number"
              placeholder=" "
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={number}
              onChange={(e) => {
                if (e.target.value === "" || /^\d*$/.test(e.target.value)) {
                  setNumber(e.target.value);
                }
              }}
              required
              maxLength={11}
              minLength={11}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="w-full h-5 border-b-2 text-center mt-2 mb-7">
          <span className="text-md font-medium dark:bg-gray-950 bg-gray-100 dark:text-gray-50 px-2">
            اطلاعات هویتی
          </span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-5">
          <div className="relative z-0 w-64 mb-10 group">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              نام و نام خانوادگی
            </label>
            <input
              id="name"
              type="text"
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          <div className="relative z-0 w-64 mb-10 group">
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              جنسیت
            </label>
            <select
              id="gender"
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value={"زن"}>زن</option>
              <option value={"مرد"}>مرد</option>
            </select>
          </div>
          <div className="relative z-0 w-64 mb-10 group">
            <label
              htmlFor="id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              کد ملی
            </label>
            <input
              id="id"
              type="text"
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          <div className="w-full max-w-3xl">
            <div className="relative z-0 w-64 mb-10 group">
              <label
                htmlFor="birthday"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                تاریخ تولد
              </label>
              <input
                type="date"
                id="birthday"
                placeholder=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
          </div>

          <div className="relative z-0 w-64 mb-10 group">
            <label
              htmlFor="fname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              نام پدر
            </label>
            <input
              id="fname"
              type="text"
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        </div>
        <div className="w-full h-5 border-b-2 text-center mt-2 mb-7">
          <span className="text-md font-medium dark:bg-gray-950 bg-gray-100 dark:text-gray-50 px-2">
            اطلاعات تکمیلی
          </span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-5">
          <div className="relative z-0 w-64 mb-10 group">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="id1"
            >
              اسکن صفحه اول کارت ملی
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="id1"
              type="file"
              onChange={(e) => {
                setID1(e.target.files[0]);
              }}
            />
          </div>
          <div className="relative z-0 w-64 mb-10 group">
            <label className="block mb-2 text-sm font-medium" htmlFor="id2">
              اسکن صفحه دوم کارت ملی
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="id2"
              accept=".png"
              type="file"
              onChange={(e) => {
                setID2(e.target.files[0]);
                0;
              }}
            />
          </div>
          <div className="relative z-0 w-64 mb-10 group">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="user_avatar"
            >
              اسکن عکس پرسنلی
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              accept=".png"
              type="file"
              onChange={(e) => {
                setProfile(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <div className="relative z-0 w-64 mb-10 group">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            آدرس
          </label>
          <textarea
            id="address"
            rows="4"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          className="px-5 py-2.5 text-sm text-gray-50 font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-4/5 max-w-sm"
        >
          ثبت نام
        </button>
      </form>
    </div>
  );
};

export default MemberSignUp;
