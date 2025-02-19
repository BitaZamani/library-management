import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supbase";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
const FinanceInfo = ({ setActiveComponent }) => {
  const { info } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getFinancalInfo = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("userdebts")
      .select()
      .eq("id_number", info.id_number);
    if (error) {
      toast.error(error.message);
      return;
    }
    setData(data);
    setLoading(false);
  };
  useEffect(() => {
    getFinancalInfo();
  }, []);
  return (
    <div className="w-full">
      {loading ? (
        <Loading />
      ) : (
        <div className="mt-5">
          <div className="flex justify-between dark:bg-gray-900 bg-gray-200 p-2 rounded-t-md mb-1">
            <span className="text-sm font-medium">مشاهده اطلاعات مالی</span>
            <button onClick={() => setActiveComponent("menu")}>
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
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 8l-4 4l4 4" />
                <path d="M16 12h-8" />
                <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
              </svg>
            </button>
          </div>
          {data.length === 0 ? (
            <span>اطلاعاتی برای نمایش وجود ندارد.</span>
          ) : (
            <div className="relative overflow-x-auto dark:bg-gray-900 bg-gray-200 rounded-b-md px-2">
              <table className="w-full text-sm text-center">
                <thead>
                  <tr className="font-medium whitespace-nowrap">
                    <th scope="col" className="px-6 py-3">
                      شماره
                    </th>
                    <th scope="col" className="px-6 py-3">
                      نام کتاب
                    </th>
                    <th scope="col" className="px-6 py-3">
                      تاخیر
                    </th>
                    <th scope="col" className="px-6 py-3">
                      مجموع جریمه
                    </th>
                    <th scope="col" className="px-6 py-3">
                      جریمه پرداخت شده
                    </th>
                    <th scope="col" className="px-6 py-3">
                      جریمه مانده
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, index) => (
                    <tr
                      key={d.id}
                      className="border-t border-gray-700 dark:border-gray-500"
                    >
                      <td className="px-2 py-4">{index + 1}</td>
                      <td className="px-2 py-4">{d.title}</td>
                      <td className="px-2 py-4">{d.delay}</td>
                      <td className="px-2 py-4">{d.total_fines}</td>
                      <td className="px-2 py-4">{d.settles}</td>
                      <td className="px-2 py-4">{d.fines}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FinanceInfo;
