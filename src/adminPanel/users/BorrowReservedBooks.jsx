import { useEffect, useState } from "react";
import { supabase } from "../../services/supbase";
import Loading from "../../components/loading";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const BorrowReservedBooks = ({ user_id, staff_id }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const getReservedBooks = async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from("user_reservations")
      .select()
      .eq("user_id", user_id);

    if (error) {
      toast.error(error.message);
      return;
    }
    setLoading(false);
    setBooks(data);
  };
  const borrow = async (book_isbn) => {
    let { error } = await supabase.rpc("borrowreservedbook", {
      book_isbn,
      staff_id,
      reserved_user_id: user_id,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("کتاب با موفقیت امانت داده شد.");
    getReservedBooks();
  };
  const deleteReserve = async (id) => {
    const { error } = await supabase
      .from("book_reservation")
      .delete.eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("رزرو با موفقیت حذف شد.");
  };
  useEffect(() => {
    getReservedBooks();
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-gray-100 dark:bg-gray-900 p-2 rounded-b-md">
          {books.length == 0 ? (
            <span>هیچ کتاب رزرو شده‌ای وجود ندارد.</span>
          ) : (
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-center">
                <thead className="text-xs">
                  <tr className="text-xs bg-gray-200 dark:bg-gray-800">
                    <th className="px-2 py-3">شماره</th>
                    <th className="px-2 py-3">نام کتاب</th>
                    <th className="px-2 py-3">شابک</th>
                    <th className="px-2 py-3">تاریخ رزرو</th>
                    <th className="px-2 py-3">امانت</th>
                    <th className="px-2 py-3">حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book, index) => (
                    <tr
                      key={book.id}
                      className=" border-t dark:border-gray-400 border-gray-700"
                    >
                      <td className="px-2 py-4">{index + 1}</td>
                      <td className="px-2 py-4">{book.title}</td>
                      <td className="px-2 py-4">{book.isbn}</td>
                      <td className="px-2 py-4">
                        {new Date(book.reserved_at).toLocaleDateString("fa")}
                      </td>
                      <td className="px-2 py-4">
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
                          onClick={() => borrow(book.isbn)}
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M14 20h-8a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12v5" />
                          <path d="M11 16h-5a2 2 0 0 0 -2 2" />
                          <path d="M15 16l3 -3l3 3" />
                          <path d="M18 13v9" />
                        </svg>
                      </td>
                      <td className="px-2 py-4">
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
                          onClick={() => deleteReserve(book.id)}
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
        </div>
      )}
    </div>
  );
};
BorrowReservedBooks.propTypes = {
  user_id: PropTypes.string.isRequired,
  staff_id: PropTypes.string.isRequired,
};
export default BorrowReservedBooks;
