import { useEffect, useState } from "react";
import { supabase } from "../../services/supbase";
import toast from "react-hot-toast";
import Search from "../../components/Search";
import Loading from "../../components/loading";
const ShowBooks = () => {
  const [books, setBooks] = useState([]);
  const [bookID, setBookID] = useState("");
  const [loading, setLoading] = useState(true);
  const getBooks = async () => {
    setLoading(true);
    const { data: books, error } = await supabase.from("books").select();
    if (error) {
      toast.error(error.message);
      return;
    }
    setBooks(books);
    setLoading(false);
  };

  const searchBook = async (isbn) => {
    if (isbn.length == 13) {
      const { data: searchedBook, error: searchError } = await supabase
        .from("books")
        .select()
        .eq("isbn", isbn);
      if (searchError) {
        toast.error(searchError.message);
        return;
      }
      if (searchedBook.length === 0) {
        toast.error("کتاب یافت نشد");
      }
      setBooks(searchedBook);
    } else {
      toast.error("شابک را به درستی وارد کنید.");
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    searchBook(bookID);
  };
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="w-4/5 justify-center mx-auto">
      <h1 className="text-lg font-semibold">مشاهده کتاب‌ها</h1>

      <Search
        value={bookID}
        setValue={setBookID}
        handleSearch={handleSearch}
        searchName={"شابک کتاب"}
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="dark:bg-gray-900 bg-gray-100 rounded-md p-2 my-3">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-center">
              <thead className="text-xs bg-gray-200 dark:bg-gray-800">
                <tr>
                  <th className="p-3">نام کتاب</th>
                  <th className="p-3">شابک</th>
                  <th className="p-3">تعداد کتاب‌های موجود</th>
                </tr>
              </thead>
              <tbody className="px-auto">
                {books.map((book, index) => (
                  <tr
                    key={index}
                    className="border-t dark:border-gray-400 border-gray-700"
                  >
                    <td className="px-6 py-4">{book.title}</td>
                    <td className="px-6 py-4">{book.isbn}</td>
                    <td className="px-6 py-4">{book.available}</td>
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

export default ShowBooks;
