import PropTypes from "prop-types";
import Reservations from "./Reservations";
import { useAuth } from "../context/AuthContext";
const BookSection = ({ book }) => {
  const { user } = useAuth();
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center dark:bg-gray-800 bg-gray-100 p-5">
        <div className="flex justify-center p-2">
          <img
            src={book.book_image}
            className="w-44 md:w-56"
            alt={book.book_title}
          />
        </div>
        <div className="w-full">
          <span className="text-center md:text-right font-bold text-base md:text-lg">
            {book.book_title}
          </span>

          <div className="w-full flex flex-col md:flex-row text-sm md:text-base">
            <div className="w-full flex flex-col md:px-5">
              <span className="py-2">
                نویسنده:
                {book.contributors
                  .filter((w) => w.role === "author")
                  .map((w) => (
                    <span key={w.id} className="px-1 font-medium">
                      {w.name}
                    </span>
                  ))}
              </span>
              <span className="py-2">
                سال انتشار:
                <span className="font-medium px-1">{book.published_year}</span>
              </span>
              <span className="py-2">
                زبان اصلی:
                <span className="font-medium px-1">{book.main_language}</span>
              </span>
            </div>

            <div className="w-full flex flex-col">
              <span className="py-2">
                شابک:
                <span className="font-medium px-1">{book.book_isbn}</span>
              </span>
              {book.contributors.filter((t) => t.role === "translator").length >
                0 && (
                <span className="py-2">
                  مترجم:
                  {book.contributors
                    .filter((t) => t.role === "translator")
                    .map((t) => (
                      <span key={t.id} className="font-medium px-1">
                        {t.name}
                      </span>
                    ))}
                </span>
              )}
              {book.translated_language && (
                <span className="py-2">
                  زبان ترجمه:
                  <span className="font-medium px-1">
                    {book.translated_language}
                  </span>
                </span>
              )}
              <span className="py-2">
                ناشر:
                <span className="font-medium px-1">{book.publishers}</span>
              </span>
              <span className="py-2">
                سری چاپ:
                <span className="font-medium px-1">{book.print_edition}</span>
              </span>
              <span className="py-2">
                سال چاپ:
                <span className="font-medium px-1">{book.print_year} </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      {user && <Reservations book={book} />}
      <div className="flex flex-wrap dark:bg-gray-800 bg-gray-100 mt-2 py-2 px-3 text-sm md:text-base">
        <span className="font-semibold">معرفی کتاب {book.book_title}:</span>
        <span className="leading-7 py-2">{book.book_summary}</span>
      </div>
      <div className="dark:bg-gray-800 bg-gray-100 mt-2 py-2 px-3">
        <span className="text-base font-semibold">دسته‌بندی‌ها: </span>
        <div className="py-2 flex flex-wrap text-sm">
          {book.tags.map((tag, index) => (
            <span key={index} className="ml-2">
              {`#${tag}`}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

BookSection.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BookSection;
