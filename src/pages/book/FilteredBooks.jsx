import { useState, useEffect } from "react";
import { supabase } from "../../services/supbase";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Loading from "../../components/loading";
import BookCard from "../../components/BookCard";
const FilteredBooks = () => {
  const { table, filter } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const getBooks = async () => {
    setLoading(true);
    let query = supabase.from("bookdetail").select();
    if (table === "genres" || table === "book_litrature") {
      query = query.contains(table, [filter]);
    } else {
      query = query.eq(table, filter);
    }

    const { data, error } = await query;
    if (error) {
      console.log(error);
      return;
    }
    setBooks(data);
    setLoading(false);
  };
  useEffect(() => {
    getBooks();
  }, []);
  return (
    <>
      <NavBar />
      <div className="w-4/5 mx-auto my-3">
        {loading ? (
          <Loading />
        ) : (
          <div className="dark:shadow-2xl shadow-slate-800">
            <span className="text-lg font-bold">{filter}</span>
            <BookCard books={books} />
          </div>
        )}
      </div>
    </>
  );
};

export default FilteredBooks;
