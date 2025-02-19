import { useEffect, useState } from "react";
import { supabase } from "../../services/supbase";
import Loading from "../../components/loading";
import toast from "react-hot-toast";
const ShowComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const getComments = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("allbookcommentsview").select();
    if (error) {
      toast.log(error.message);
      return;
    }
    setComments(data);
    setLoading(false);
  };
  useEffect(() => {
    getComments();
  }, []);
  return (
    <div className="w-4/5 justify-center mx-auto">
      <h1 className="text-lg font-semibold">مشاهده کامنت‌ها</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="dark:bg-gray-900 bg-gray-100 rounded-md p-2 my-3">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-center">
              <thead className="text-xs bg-gray-200 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    نام کاربر
                  </th>
                  <th scope="col" className="px-6 py-3">
                    نام کتاب
                  </th>
                  <th scope="col" className="px-6 py-3">
                    نظر
                  </th>
                  <th scope="col" className="px-6 py-3">
                    تاریخ
                  </th>
                </tr>
              </thead>
              <tbody className="px-auto">
                {comments.map((comment) => (
                  <tr
                    key={comment.id}
                    className="border-t dark:border-gray-400 border-gray-700"
                  >
                    <td className="px-6 py-4">{comment.user_name}</td>
                    <td className="px-6 py-4">{comment.book_name}</td>
                    <td className="px-6 py-4">{comment.comment}</td>
                    <td className="px-6 py-4">
                      {new Date(comment.created_at).toLocaleDateString("fa")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowComments;
