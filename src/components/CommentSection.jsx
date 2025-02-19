import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supbase";
import { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";

const CommentSection = ({ isbn, book_title }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState([]);
  const [showCommentIn, setShowCommentIn] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const getComments = async () => {
    const { data, error } = await supabase
      .from("bookcommentsview")
      .select()
      .eq("book_isbn", isbn);

    if (error) {
      toast.error(error.message);
      return;
    }
    setAllComments(data);
  };
  const addComment = async (e) => {
    e.preventDefault();
    const uID = user.id;
    if (comment.length > 0) {
      const { error } = await supabase.rpc("addcomment", {
        book_id: isbn,
        user_id: uID,
        comment,
        replied_to: false,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("نظر شما با موفقیت ثبت شد.");
      setComment("");
      getComments();
    } else {
      toast.error("لطفا نظر خود را بنویسید.");
    }
  };
  useEffect(() => {
    getComments();
  }, []);
  return (
    <div>
      <div className="my-3 dark:bg-gray-800 bg-gray-100 py-2 px-3">
        <div className="w-full flex flex-col sm:flex-row sm:justify-between">
          <span className="font-semibold text-sm md:text-base">
            نظر کاربران در مورد {`"کتاب ${book_title}"`}
          </span>
          {user && (
            <div className="flex items-center justify-center text-sm ">
              <button
                className="w-44 py-2 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                onClick={() => setShowCommentIn(true)}
              >
                {showCommentIn ? "در حال ثبت" : "افزودن دیدگاه جدید"}
              </button>
            </div>
          )}
        </div>

        <div className="w-full py-2 px-3">
          {user ? (
            <div>
              {showCommentIn && (
                <form className="w-full" onSubmit={addComment}>
                  <div className="max-w-2xl mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className=" bg-white rounded-t-lg dark:bg-gray-800">
                      <textarea
                        id="comment"
                        rows="6"
                        className="w-full px-4 py-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-1 dark:text-white dark:placeholder-gray-400 focus:outline-none"
                        placeholder="نظر شما..."
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="flex items-center justify-end px-3 py-2 border-t dark:border-gray-600">
                      <button
                        type="submit"
                        className="inline-flex ml-5 items-center py-2 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                      >
                        پست
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center py-2 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        onClick={() => setShowCommentIn(false)}
                      >
                        انصراف
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <span className="text-sm"> برای ثبت نظر وارد حساب خود شوید.</span>
          )}
        </div>
        {allComments != 0 ? (
          allComments.map((c) => (
            <div
              key={c.id}
              className="py-2 px-3 flex flex-col border-t-2 border-dotted border-b-2 dark:border-gray-500 border-gray-400"
            >
              <span className="md:text-base text-sm">{c.comment}</span>
              <div className="flex text-sm ">
                <span className="py-2 px-1 text-xs md:text-sm">
                  {c.user_name}
                </span>
                <span className="py-2 text-xs md:text-sm">|</span>
                <span className="py-2 px-1 text-xs md:text-sm">
                  {new Date(c.created_at).toLocaleDateString("fa")}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center flex-col">
            <span className="text-sm text-center">
              اولین نفری باشید که نظر خود را درباره {`"${book_title}"`} ثبت
              می‌کند.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
CommentSection.propTypes = {
  isbn: PropTypes.string.isRequired,
  allComments: PropTypes.object.isRequired,
  book_title: PropTypes.string.isRequired,
};
export default CommentSection;
