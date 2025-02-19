import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supbase";
import BorrowedBooks from "./BorrowedBooks";
import ReturnedBooks from "./RetunedBooks";
import AllBooks from "./AllBooks";
import ReservedBooks from "./ReservedBooks";
import Loading from "../components/loading";
const BookDocs = () => {
  const [loading, setLoading] = useState(true);
  const [bookDoc, setBookDoc] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filter, setFilter] = useState("all");
  const { user } = useAuth();
  const getBookDocs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookdocforuser")
      .select("*")
      .eq("member", user.id);
    if (error) {
      console.log(error);
      return;
    }
    setBookDoc(data);
    setFilteredBooks(data);
    setLoading(false);
  };
  const handleSelect = (e) => {
    const value = e.target.value;
    setFilter(value);
    if (value == "returned") {
      setFilteredBooks(bookDoc.filter((book) => book.returned));
    } else if (value == "borrowed") {
      setFilteredBooks(bookDoc.filter((book) => !book.returned));
    }
  };

  useEffect(() => {
    getBookDocs();
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <h1>کتاب‌های شما</h1>
        <select
          onChange={handleSelect}
          className="block py-2.5 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:border-gray-700 focus:outline-none peer dark:bg-gray-950"
        >
          <option value="all">تمام کتاب‌ها</option>
          <option value="borrowed">کتاب‌های در امانت</option>
          <option value="returned">کتاب‌های بازگردانده‌شده</option>
          <option value="reserved">کتاب‌های رزروشده</option>
        </select>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="relative overflow-x-auto mt-5">
          {filter == "all" && <AllBooks bookDoc={bookDoc} />}
          {filter == "borrowed" && (
            <BorrowedBooks
              filteredBooks={filteredBooks}
              userID={user.id}
              getBookDocs={getBookDocs}
            />
          )}
          {filter == "returned" && (
            <ReturnedBooks filteredBooks={filteredBooks} />
          )}
          {filter == "reserved" && <ReservedBooks userID={user.id} />}
        </div>
      )}
    </div>
  );
};

export default BookDocs;
