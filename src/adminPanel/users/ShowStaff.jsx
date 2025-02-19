import { useEffect, useState } from "react";
import { supabase } from "../../services/supbase";
import toast from "react-hot-toast";
import Search from "../../components/Search";
import Loading from "../../components/loading";
const ShowStaff = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState("");
  const getUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("staff").select();
    if (error) {
      toast.error(error.message);
      return;
    }
    setUsers(data);
    setLoading(false);
  };

  const searchUser = async (id) => {
    if (id.length == 10) {
      const { data: searchedUser, error: searchError } = await supabase
        .from("staff")
        .select()
        .eq("id_number", id);
      if (searchError) {
        toast.error(searchError.message);
        return;
      }
      if (searchedUser.length === 0) {
        toast.error("کاربری با این کد ملی یافت نشد");
      }
      setUsers(searchedUser);
    } else {
      toast.error("کد ملی را به درستی وارد کنید.");
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    searchUser(userID);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className=" w-4/5 flex justify-center flex-col mx-auto">
      <h1 className="text-lg font-semibold">مشاهده کارمندان</h1>

      <div className="w-full">
        <Search
          value={userID}
          setValue={setUserID}
          handleSearch={handleSearch}
          searchName={"کد ملی"}
        />
        {loading ? (
          <Loading />
        ) : (
          <div className="dark:bg-gray-900 bg-gray-100 rounded-md p-2 my-3">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-center">
                <thead className="text-xs bg-gray-200 dark:bg-gray-800">
                  <tr>
                    <th className="p-3">پروفایل</th>
                    <th className="p-3">نام و نام خانوادگی</th>
                    <th className="p-3">کد ملی</th>
                    <th className="p-3">مسئولیت</th>
                    <th className="p-3">سطح دسترسی</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={index}
                      className="border-t dark:border-gray-400 border-gray-700"
                    >
                      <td className="p-3">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={user.profile}
                          alt={`${user.name} profile`}
                        />
                      </td>
                      <td className="px-6 py-4"> {user.name}</td>
                      <td className="px-6 py-4"> {user.id_number}</td>
                      <td className="px-6 py-4"> {user.resp}</td>
                      <td className="px-6 py-4"> {user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowStaff;
