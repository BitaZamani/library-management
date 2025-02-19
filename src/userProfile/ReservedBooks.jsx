import { useEffect, useState } from "react";
import { supabase } from "../services/supbase";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import Loading from "../components/loading";
import PropTypes from "prop-types";
const ReservedBooks = ({ userID }) => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const getReservedBooks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reservationforuser")
      .select()
      .eq("user_id", userID);
    if (error) {
      toast.error(error.message);
      return;
    }
    setBooks(data);
    console.log(data);
    setLoading(false);
  };
  const deleteReserve = async (book_id) => {
    const { error } = await supabase
      .from("book_reservation")
      .delete()
      .match({ user_id: userID, book_id: book_id });
    if (error) {
      toast.error(error.message);
      console.log(error);
      return;
    }
    toast.success("رزرو شما با موفقیت حذف شد.");
    getReservedBooks();
  };
  useEffect(() => {
    getReservedBooks();
  }, []);
  return (
    <div className="w-full ">
      {loading ? (
        <Loading />
      ) : (
        <>
          {books.length == 0 ? (
            <span>
              هنوز هیچ کتابی رزرو نکرده‌اید. آیا دنبال{" "}
              <NavLink
                to="/libraryexplorer"
                className="underline dark:text-cyan-800"
              >
                <span>کتاب جدید</span>
              </NavLink>{" "}
              هستید؟
            </span>
          ) : (
            <div className="relative overflow-x-auto mt-5 dark:bg-gray-900 bg-gray-200 rounded-md px-2">
              <table className="w-full text-sm text-center">
                <thead className="text-xs">
                  <tr>
                    <th scope="col" className="px-2 py-3">
                      شماره
                    </th>
                    <th scope="col" className="px-2 py-3">
                      کتاب
                    </th>
                    <th scope="col" className="px-2 py-3">
                      تاریخ رزرو
                    </th>
                    <th scope="col" className="px-2 py-3">
                      مهلت باقی‌مانده
                    </th>
                    <th scope="col" className="px-2 py-3">
                      حذف رزرو
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((rb, index) => (
                    <tr
                      key={rb.id}
                      className="border-t border-gray-700 dark:border-gray-500"
                    >
                      <td className="px-2 py-4">{index + 1}</td>
                      <td className="px-2 py-4">{rb.title}</td>
                      <td className="px-2 py-4">
                        {new Date(rb.reserved_at).toLocaleDateString("fa")}
                      </td>
                      <td className="px-2 py-4">{rb.remained_days}</td>
                      <td className="px-2 py-4 text-center">
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
                          className="cursor-pointer inline-block"
                          onClick={() => {
                            deleteReserve(rb.book_id);
                          }}
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 7l16 0" />
                          <path d="M10 11l0 6" />
                          <path d="M14 11l0 6" />
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};
ReservedBooks.propTypes = {
  userID: PropTypes.string.isRequired,
};
export default ReservedBooks;
