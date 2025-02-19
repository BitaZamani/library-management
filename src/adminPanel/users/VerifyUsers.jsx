import toast from "react-hot-toast";
import { supabase } from "../../services/supbase";
import { useEffect, useState } from "react";
import Search from "../../components/Search";
import axios from "axios";
import Loading from "../../components/loading";
import { useAuth } from "../../context/AuthContext";

const VerifyUsers = () => {
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [id, setID] = useState("");
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchUnverifiedUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("new_users").select("*");
    if (error) {
      toast.error(error.message);
      return;
    }
    setUnverifiedUsers(data);
    setLoading(false);
  };

  const searchUser = async (id) => {
    if (id.length !== 10) {
      toast.error("کد ملی را به درستی وارد کنید.");
      return;
    }
    const { data, error } = await supabase
      .from("new_users")
      .select()
      .eq("id_number", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data.length === 0) {
      toast.error("کاربری با این کد ملی یافت نشد");
    }
    setUnverifiedUsers(data);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    id.trim() ? searchUser(id) : fetchUnverifiedUsers();
  };
  const VerifyUser = async (newUser) => {
    const verifiedUser = await createAuthUser(newUser.email);
    await addUser(newUser, verifiedUser.id);
    toast.success("کاربر تایید شد.");
    setShowUserInfo(false);
    setSelectedUser(null);
    fetchUnverifiedUsers();
  };
  const createAuthUser = async (email) => {
    try {
      const response = await axios.post("/api/createUser", {
        email,
        password: "12345678",
      });
      return response.data.authData.user;
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };
  const addUser = async (newUser, id) => {
    // Move profile image
    const { error: profileError } = await supabase.storage
      .from("users")
      .copy(
        `new_users/${newUser.id_number}_0.jpg`,
        `users_profile/${newUser.id_number}.jpg`
      );

    if (profileError) {
      toast.error(profileError.message);
      return;
    }

    // copy ID card images separately
    const { error: idCard1Error } = await supabase.storage
      .from("users")
      .copy(
        `new_users/${newUser.id_number}_1.jpg`,
        `id_card/${newUser.id_number}_1.jpg`
      );

    if (idCard1Error) {
      toast.error(idCard1Error.message);
      return;
    }

    const { error: idCard2Error } = await supabase.storage
      .from("users")
      .copy(
        `new_users/${newUser.id_number}_2.jpg`,
        `id_card/${newUser.id_number}_2.jpg`
      );

    if (idCard2Error) {
      toast.error(idCard2Error.message);
      return;
    }

    const profileURL = `https://cuxfjmqvtsgnjfiprsgb.supabase.co/storage/v1/object/public/users/users_profile/${newUser.id_number}.jpg`;
    const id1URL = `https://cuxfjmqvtsgnjfiprsgb.supabase.co/storage/v1/object/public/users/id_card/${newUser.id_number}_1.jpg`;
    const id2URL = `https://cuxfjmqvtsgnjfiprsgb.supabase.co/storage/v1/object/public/users/id_card/${newUser.id_number}_2.jpg`;

    const { error: rpcError } = await supabase.rpc("verifyuser", {
      user_id: id,
      user_id_number: newUser.id_number,
      staff_id: user.id,
      profileurl: profileURL,
      id1url: id1URL,
      id2url: id2URL,
    });

    if (rpcError) {
      toast.error(rpcError.message);
      return;
    }
    toast.success("کاربر با موفقیت ثبت شد!");
  };
  const deleteUser = async (id) => {
    const { error } = await supabase
      .from("new_users")
      .delete()
      .eq("id_number", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("کاربر حذف شد.");
  };
  useEffect(() => {
    fetchUnverifiedUsers();
  }, []);

  return (
    <div className="w-4/5 mx-auto relative">
      <h1 className="text-lg font-semibold">خدمات کاربران</h1>
      <Search
        value={id}
        setValue={setID}
        handleSearch={handleSearch}
        searchName={"کد ملی"}
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="dark:bg-gray-900 bg-gray-100 rounded-md p-2 my-3">
          {unverifiedUsers.length == 0 ? (
            <span className="p-2">هیج کاربر جدیدی وجود ندارد.</span>
          ) : (
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-center">
                <thead className="text-xs bg-gray-200 dark:bg-gray-800">
                  <tr>
                    <th className="px-2 py-3">شماره</th>
                    <th className="px-2 py-3">نام و نام خانوادگی</th>
                    <th className="px-2 py-3">کد ملی</th>
                    <th className="px-2 py-3">تایید</th>
                    <th className="px-2 py-3">حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {unverifiedUsers.map((user, index) => (
                    <tr
                      className="border-b bg-gray-100 dark:bg-gray-900 dark:border-gray-700"
                      key={user.id}
                    >
                      <td className="px-2 py-4">{index + 1}</td>
                      <td className="px-2 py-4">{user.name}</td>
                      <td className="px-2 py-4">{user.id_number}</td>
                      <td className="px-2 py-4">
                        <button
                          onClick={() => {
                            setShowUserInfo(true);
                            setSelectedUser(user);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            color="green"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-square-check"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                            <path d="M9 12l2 2l4 -4" />
                          </svg>
                        </button>
                      </td>
                      <td className="px-2 py-4">
                        <button
                          onClick={() => {
                            deleteUser(user.id_number);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            color="red"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 7l16 0" />
                            <path d="M10 11l0 6" />
                            <path d="M14 11l0 6" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {showUserInfo && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-10"
          onClick={() => {
            setShowUserInfo(false);
            setSelectedUser(null);
          }}
        ></div>
      )}

      {showUserInfo && selectedUser && (
        <div className="fixed top-1/3 bg-gray-300 dark:bg-gray-800 shadow-lg p-4 rounded-md w-3/5 z-20">
          <h2 className="text-center font-semibold mb-3">اطلاعات کاربر</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm md:text-base">
            <ul>
              <li>نام و نام خانوادگی: {selectedUser.name}</li>
              <li>ایمیل: {selectedUser.email}</li>
              <li>کد ملی: {selectedUser.id_number}</li>
              <li>جنسیت: {selectedUser.gender}</li>
              <li>آدرس: {selectedUser.address}</li>
              <li>تلفن همراه: {selectedUser.number}</li>
              <li>
                تاریخ تولد:
                {new Date(selectedUser.birthday).toLocaleDateString("fa")}
              </li>
            </ul>
            <ul>
              <li>
                عکس پرسنلی:
                <button
                  onClick={() => window.open(selectedUser.profile, "_blank")}
                >
                  مشاهده
                </button>
              </li>
              <li>
                کارت ملی (صفحه ۱):
                <button
                  onClick={() => window.open(selectedUser.id_card1, "_blank")}
                >
                  مشاهده
                </button>
              </li>
              <li>
                کارت ملی (صفحه ۲):
                <button
                  onClick={() => window.open(selectedUser.id_card2, "_blank")}
                >
                  مشاهده
                </button>
              </li>
            </ul>
          </div>
          <button
            onClick={() => {
              setShowUserInfo(false);
              setSelectedUser(null);
            }}
            className="mt-4 px-5 py-2.5 rounded-lg text-sm"
          >
            لغو
          </button>
          <button
            onClick={() => {
              VerifyUser(selectedUser);
            }}
            className="mt-4 bg-green-700 hover:bg-green-800 px-5 py-2.5 rounded-lg text-sm"
          >
            تایید و ثبت کاربر
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyUsers;
