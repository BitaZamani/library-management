import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../services/supbase";
import NavBar from "../../components/NavBar";
import CommentSection from "../../components/CommentSection";
import BookSection from "../../components/BookSection";
import Loading from "../../components/loading";
const BookInfo = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBookInfo = async () => {
    const { data, error } = await supabase
      .from("bookdetail")
      .select()
      .eq("book_isbn", isbn)
      .single();
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
    setBook(data);
    setLoading(false);
  };

  useEffect(() => {
    getBookInfo();
  }, []);
  return (
    <>
      <NavBar />
      <div className="w-4/5 mx-auto my-3">
        <div className="mx-auto px-5">
          {loading ? (
            <Loading />
          ) : (
            <div>
              <BookSection book={book} />
              <CommentSection isbn={isbn} book_title={book.book_title} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

BookInfo.propTypes = {};

export default BookInfo;
