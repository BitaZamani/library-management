import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { supabase } from "../../services/supbase";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import Search from "../../components/Search";
import BookCard from "../../components/BookCard";
import Loading from "../../components/loading";
const LibraryExplorer = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const getBooks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookdetail")
      .select("book_title, book_id, book_image, book_isbn, contributors");
    if (error) {
      console.log(error);
      return;
    }
    setBooks(data);
    setLoading(false);
  };
  const searching = async (search) => {
    setLoading(true);
    const searchQuery = search
      .split(" ")
      .map((term) => term.trim())
      .filter((term) => term.length > 0)
      .join(" & ");
    const { data, error: searchError } = await supabase
      .from("bookdetail")
      .select()
      .textSearch("search_tsv", searchQuery, {
        config: "simple",
      });
    if (searchError) {
      toast.error(searchError.message);
      return;
    }
    setBooks(data);
    setLoading(false);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      getBooks();
    } else {
      searching(search);
    }
  };

  useEffect(() => {
    if (search.trim() === "") {
      getBooks();
    }
  }, [search]);

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <NavBar />
      <div className="w-4/5 mx-auto my-3">
        <div className="px-5 w-full bg-[css-pattern] mb-5">
          <Search
            value={search}
            setValue={setSearch}
            handleSearch={handleSearch}
            searchName={"نام کتاب یا نویسنده"}
          />
          <div className="py-5 w-full lg:w-4/5 mx-auto lg:text-base flex justify-between text-sm relative overflow-x-auto">
            <NavLink
              to={`/libraryexplorer/${"book_type"}`}
              className="flex flex-col items-center justify-center group ml-5"
            >
              <div className="rounded-full bg-blue-500 text-white group-hover:border-gray-950 group-hover:text-gray-950 dark:text-black p-4 dark:group-hover:border-gray-50 dark:group-hover:text-gray-50 border-2 border-transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                  <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                  <path d="M3 6l0 13" />
                  <path d="M12 6l0 13" />
                  <path d="M21 6l0 13" />
                </svg>
              </div>
              <span>موضوعی</span>
            </NavLink>
            <NavLink
              to={`/libraryexplorer/${"genres"}`}
              className="flex flex-col items-center justify-center ml-5 group"
            >
              <div className="rounded-full bg-blue-500 text-white group-hover:border-gray-950 group-hover:text-gray-950 dark:text-black p-4 dark:group-hover:border-gray-50 dark:group-hover:text-gray-50 border-2 border-transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
                </svg>
              </div>
              <span>ژانرهای ادبی</span>
            </NavLink>
            <NavLink
              to={`/libraryexplorer/${"book_litrature"}`}
              className="flex flex-col items-center justify-center ml-5 group"
            >
              <div className="rounded-full bg-blue-500 text-white group-hover:border-gray-950 group-hover:text-gray-950 dark:text-black p-4 dark:group-hover:border-gray-50 dark:group-hover:text-gray-50 border-2 border-transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 20l10 -10m0 -5v5h5m-9 -1v5h5m-9 -1v5h5m-5 -5l4 -4l4 -4" />
                  <path d="M19 10c.638 -.636 1 -1.515 1 -2.486a3.515 3.515 0 0 0 -3.517 -3.514c-.97 0 -1.847 .367 -2.483 1m-3 13l4 -4l4 -4" />
                </svg>
              </div>
              <span>مکاتب ادبی</span>
            </NavLink>
            <NavLink
              to={`/libraryexplorer/${"book_origin"}`}
              className="flex flex-col items-center justify-center ml-5 group"
            >
              <div className="rounded-full bg-blue-500 text-white group-hover:border-gray-950 group-hover:text-gray-950 dark:text-black p-4 dark:group-hover:border-gray-50 dark:group-hover:text-gray-50 border-2 border-transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z" />
                  <path d="M5 21v-7" />
                </svg>
              </div>
              <span>ادبیات ملل</span>
            </NavLink>
            <NavLink
              to={`/libraryexplorer/${"book_decade"}`}
              className="flex flex-col items-center justify-center group"
            >
              <div className="rounded-full bg-blue-500 text-white group-hover:border-gray-950 group-hover:text-gray-950 dark:text-black p-4 dark:group-hover:border-gray-50 dark:group-hover:text-gray-50 border-2 border-transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
                  <path d="M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1z" />
                </svg>
              </div>
              <span>دهه</span>
            </NavLink>
          </div>
        </div>
        <div className="">
          {loading ? (
            <Loading />
          ) : (
            <div className="p-3">
              <BookCard books={books} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LibraryExplorer;
