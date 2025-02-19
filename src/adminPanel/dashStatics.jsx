import { useEffect, useState } from "react";
import { supabase } from "../services/supbase";
import Loading from "../components/loading";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const DashStatics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("library_dashboard")
      .select()
      .single();
    if (error) {
      toast.error(error.message);
      return;
    }
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const books = data
    ? [
        { name: "کل", book: data.borrowed_books },
        { name: "۳۰ روز", book: data.borrowed_last_month },
        { name: "۷ روز", book: data.borrowed_last_7_days },
      ]
    : [];

  const users = data
    ? [
        { name: "کل", users: data.total_users },
        { name: "۳۰ روز", users: data.users_last_month },
        { name: "۷ روز", users: data.users_last_7_days },
      ]
    : [];
  const new_users = data
    ? [
        { name: "کل", new_users: data.new_users },
        { name: "۳۰ روز", new_users: data.new_users_last_month },
        { name: "۷ روز", new_users: data.new_users_last_7_days },
      ]
    : [];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <div className="relative bg-gray-100 dark:bg-gray-900 py-6 px-8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          خوش آمدید
        </h2>
        <span className="block text-gray-600 dark:text-gray-400">
          {new Date().toLocaleDateString("fa")}
        </span>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
              آمار کاربران
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={users}>
                <CartesianGrid strokeDasharray="1 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
              آمار کاربران جدید
            </h3>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={new_users}>
                <CartesianGrid strokeDasharray="1 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="new_users" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <span className="text-2xl font-semibold">{data.total_books}</span>
            <p className="dark:text-gray-200 text-gray-700">تعداد کتاب‌ها</p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
              آمار فعالیت کاربران
            </h3>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={books}>
                <CartesianGrid strokeDasharray="1 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="book" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashStatics;
