import { useState } from "react";
import { supabase } from "../../services/supbase";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
const BorrowBook = ({ staff_id, user_id }) => {
  const [isbn, setISBN] = useState("");
  const borrow = async (isbn) => {
    if (isbn.length == 13) {
      const { error } = await supabase.rpc("borrowbook", {
        book_isbn: isbn,
        user_id,
        staff_id,
      });

      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("کتاب با موفقیت امانت داده شد.");
      setISBN("");
    } else {
      toast.error("فرم را به درستی پر کنید");
    }
  };
  return (
    <div className="flex justify-center bg-gray-100 dark:bg-gray-900 rounded-b-md">
      <div className="w-full max-w-lg m-3">
        <label htmlFor="isbn" className="mb-2 text-sm font-medium">
          شابک کتاب
        </label>
        <input
          className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          id="isbn"
          type="text"
          value={isbn}
          onChange={(e) => {
            if (e.target.value === "" || /^\d*$/.test(e.target.value))
              setISBN(e.target.value);
          }}
        />
        <button
          className="p-2 mt-8 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full max-w-lg"
          onClick={() => borrow(isbn)}
        >
          امانت
        </button>
      </div>
    </div>
  );
};
BorrowBook.propTypes = {
  staff_id: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired,
};
export default BorrowBook;
