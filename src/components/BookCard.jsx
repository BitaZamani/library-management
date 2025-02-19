import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
const BookCard = ({ books }) => {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {books.map((book) => (
        <NavLink
          to={`/bookinfo/${book.book_isbn}`}
          key={book.id}
          className="flex flex-col shadow-lg rounded-md max-w-[188px] group cursor-pointer transform duration-500 hover:-translate-y-1  bg-gray-100 dark:bg-gray-900 dark:shadow-2xl p-3"
        >
          <img
            src={book.book_image}
            alt={book.book_title}
            className="w-full h-60 group-hover:opacity-85 rounded-t-md rounded-b-sm"
          />
          <div>
            <div className="flex flex-col">
              <span className="text-base font-semibold py-2">
                {book.book_title}
              </span>
              <span className="text-sm dark:text-gray-300 text-gray-700 pb-1">
                نویسنده:
                {book.contributors
                  .filter((w) => w.role === "author")
                  .map((w) => (
                    <span key={w.id} className="px-1">
                      {w.name}
                    </span>
                  ))}
              </span>
              {book.contributors.filter((t) => t.role === "translator").length >
                0 && (
                <span className="text-sm dark:text-gray-300 text-gray-700 pb-2">
                  مترجم:
                  {book.contributors
                    .filter((t) => t.role === "translator")
                    .map((t) => (
                      <span key={t.id} className="px-1">
                        {t.name}
                      </span>
                    ))}
                </span>
              )}
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};
BookCard.propTypes = {
  books: PropTypes.array.isRequired,
};
export default BookCard;
