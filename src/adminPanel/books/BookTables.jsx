import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../services/supbase";
import AllLists from "./AllLists";
import Search from "../../components/Search";
import Loading from "../../components/loading";
import BorrowedLists from "./BorrowedLists";
import ReturnedListsLists from "./ReturnedListsLists";
const BookTables = () => {
  const [filter, setFilter] = useState("");
  const [bookDoc, setBookDoc] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const getBookDocs = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("bookdocforadmin").select("*");
    if (error) {
      console.log(error);
      return;
    }
    setBookDoc(data);
    setLoading(false);
    console.log(data);
  };
  const handleSelect = (e) => {
    const value = e.target.value;
    setFilter(value);
    if (value == "returned") {
      setFilter("returned");
    } else if (value == "borrowed") {
      setFilter("borrowed");
    } else {
      setFilter("all");
    }
  };
  const searchDoc = async (entry) => {
    const { data, error: searchError } = await supabase
      .from("bookdocforadmin")
      .select()
      .eq("id_number", entry);
    if (searchError) {
      toast.error(searchError.message);
      return;
    }
    setBookDoc(data);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    searchDoc(search);
  };
  useEffect(() => {
    getBookDocs();
    setFilter("all");
  }, []);
  return (
    <div className="w-4/5 flex justify-center mx-auto h-full flex-col">
      <div className="w-full flex justify-around mt-5 flex-col">
        <h1 className="text-lg font-semibold">اسناد</h1>
        <div className="w-full flex justify-between">
          <Search
            value={search}
            setValue={setSearch}
            handleSearch={handleSearch}
            searchName={"کد ملی"}
          />

          <select
            id="default"
            defaultValue={"all"}
            className="block py-3 text-sm  bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer dark:bg-gray-950"
            onChange={handleSelect}
          >
            <option value="all">تمام اسناد</option>
            <option value="borrowed">اسناد امانت</option>
            <option value="returned">اسناد برگشتی</option>
          </select>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="my-3">
            {filter == "all" && <AllLists bookDoc={bookDoc} />}
            {filter == "borrowed" && <BorrowedLists bookDoc={bookDoc} />}
            {filter == "returned" && <ReturnedListsLists bookDoc={bookDoc} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookTables;
