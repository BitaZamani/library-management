import { useState } from "react";
import { supabase } from "../../services/supbase";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
const AddBook = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const [mainLang, setMainLang] = useState("");
  const [transLang, setTransLang] = useState("");
  const [summary, setSummary] = useState("");
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState("");
  const [translators, setTranslators] = useState([]);
  const [translator, setTranslator] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [pages, setPages] = useState("");
  const [copies, setCopies] = useState("");
  const [isbn, setISBN] = useState("");
  const [printEdition, setPrintEdition] = useState("");
  const [printYear, setPrintYear] = useState("");
  const [type, setType] = useState("");
  const [litrature, setLitrature] = useState("");
  const [litratures, setLitratures] = useState([]);
  const [origin, setOrigin] = useState("");
  const [decade, setDecade] = useState("");
  const [file, setFile] = useState(null);

  const handleAddAuthor = (name) => {
    setAuthors((prev) => [...prev, { name }]);
  };

  const handleAddTranslator = (name) => {
    setTranslators((prev) => [...prev, { name }]);
  };
  const handleAddGenre = (genre) => {
    setGenres((prev) => [...prev, { genre }]);
  };
  const handleAddLitrature = (value) => {
    setLitratures((prev) => [...prev, { value }]);
    console.log(litratures);
  };

  const handleSubmit = async (e) => {
    const imgURL = `https://cuxfjmqvtsgnjfiprsgb.supabase.co/storage/v1/object/public/books/covers/${isbn}.jpg`;
    e.preventDefault();

    try {
      const { error } = await supabase.storage
        .from("books")
        .upload(`covers/${isbn}.jpg`, file, { upsert: true });
      if (error) {
        toast.error(error.message);
        return;
      }

      const { error: bookError } = await supabase.rpc("addbook", {
        title,
        summary,
        pages,
        copies,
        type_value: type,
        origin_value: origin,
        decade_value: decade,
        book_isbn: isbn,
        img: imgURL,
        added_by: user.id,
        publisher_name: publisher,
        mainlang: mainLang,
        translang: transLang,
        published_year: publishedYear,
        print_edition: printEdition,
        print_year: printYear,
        authors,
        translators,
        genres,
        litratures,
      });
      if (bookError) {
        toast.error(bookError.message);
        return;
      }

      toast.success("کتاب با موفقیت اضافه شد.");
      setTitle("");
      setMainLang("");
      setGenre("");
      setGenres([]);
      setTransLang("");
      setSummary("");
      setAuthor("");
      setAuthors([]);
      setTranslator("");
      setTranslators([]);
      setPublisher("");
      setLitrature("");
      setLitratures([]);
      setPublishedYear("");
      setPages("");
      setCopies("");
      setISBN("");
      setPrintEdition("");
      setPrintYear("");
      setType("");
      setOrigin("");
      setDecade("");
      setFile(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      className="flex justify-center items-center flex-col w-4/5 m-auto max-w-xl"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mt-6 dark:text-gray-50">
        افزودن کتاب جدید
      </h2>
      <div className="w-full h-5 border-b-2 text-center mt-5 dark:border-gray-300 border-gray-700">
        <span className="text-sm font-medium dark:bg-gray-950 bg-gray-50 text-gray-700 dark:text-gray-300 px-2">
          اطلاعات کتاب
        </span>
      </div>
      <div className="w-full mt-4">
        <label htmlFor="title" className="text-sm font-medium">
          نام کتاب
        </label>
        <input
          className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="w-full m-4 flex flex-col">
        <div className="flex items-center">
          <div className="w-full ml-3 ">
            <label htmlFor="main-genre" className="text-sm font-medium">
              ژانرها
            </label>
            <input
              className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              id="main-genre"
              type="text"
              value={genre}
              onChange={(e) => {
                if (/^[\u0600-\u06FF\s]*$/.test(e.target.value))
                  setGenre(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              handleAddGenre(genre);
              setGenre("");
              console.log(genres);
            }}
            className="mt-5 px-5 py-2.5 font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white"
          >
            +
          </button>
        </div>
        <div className="flex flex-wrap">
          {genres &&
            genres.map((g, index) => (
              <div
                key={index}
                className="inline-flex items-center px-2 py-1 me-2 mt-5 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="cursor-pointer"
                  onClick={() =>
                    setGenres((prev) =>
                      prev.filter((allgenres) => allgenres.genre !== g.genre)
                    )
                  }
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
                {g.genre}
              </div>
            ))}
        </div>
      </div>
      <div className="w-full m-4 flex flex-col">
        <div className="flex items-center">
          <div className="w-full ml-3 ">
            <label htmlFor="main-genre" className="text-sm font-medium">
              ادبیات
            </label>
            <input
              className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              id="main-genre"
              type="text"
              value={litrature}
              onChange={(e) => {
                if (/^[\u0600-\u06FF\s]*$/.test(e.target.value))
                  setLitrature(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              handleAddLitrature(litrature);
              setLitrature("");
            }}
            className="mt-5 px-5 py-2.5 font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white"
          >
            +
          </button>
        </div>
        <div className="flex flex-wrap">
          {litratures &&
            litratures.map((lit, index) => (
              <div
                key={index}
                className="inline-flex items-center px-2 py-1 me-2 mt-5 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="cursor-pointer"
                  onClick={() =>
                    setLitratures((prev) =>
                      prev.filter((lits) => lits.value !== lit.value)
                    )
                  }
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
                {lit.value}
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-between w-full m-4">
        <div className="w-1/2 ml-3 ">
          <label htmlFor="main-lang" className="mb-2 text-sm font-medium">
            کشور
          </label>
          <input
            className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            id="main-lang"
            type="text"
            value={origin}
            onChange={(e) => {
              if (/^[\u0600-\u06FF\s]*$/.test(e.target.value))
                setOrigin(e.target.value);
            }}
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="main-lang" className="mb-2 text-sm font-medium">
            دهه
          </label>
          <input
            className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            id="main-lang"
            type="text"
            value={decade}
            onChange={(e) => {
              if (e.target.value === "" || /^\d*$/.test(e.target.value))
                setDecade(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex justify-between w-full m-4">
        <div className="w-1/2 ml-3 ">
          <label htmlFor="main-lang" className="mb-2 text-sm font-medium">
            زبان اصلی
          </label>
          <input
            className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            id="main-lang"
            type="text"
            value={mainLang}
            onChange={(e) => {
              if (/^[\u0600-\u06FF\s]*$/.test(e.target.value))
                setMainLang(e.target.value);
            }}
          />
        </div>

        <div className="w-1/2">
          <label htmlFor="translated-lang" className="mb-2 text-sm font-medium">
            ترجمه شده به
          </label>
          <input
            className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            id="translated-lang"
            type="text"
            value={transLang}
            onChange={(e) => {
              if (/^[\u0600-\u06FF\s]*$/.test(e.target.value))
                setTransLang(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex justify-between w-full m-4">
        <div className="w-1/2 ml-3 ">
          <label htmlFor="year-published" className="mb-2 text-sm font-medium">
            سال انتشار
          </label>
          <input
            className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            id="year-published"
            type="text"
            maxLength={4}
            value={publishedYear}
            onChange={(e) => {
              if (e.target.value === "" || /^\d*$/.test(e.target.value))
                setPublishedYear(e.target.value);
            }}
          />
        </div>
        <div className="w-1/2 ml-1">
          <label htmlFor="pages" className="mb-2 text-sm font-medium">
            نوع کتاب
          </label>
          <input
            className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            id="pages"
            type="text"
            value={type}
            onChange={(e) => {
              if (/^[\u0600-\u06FF\s]*$/.test(e.target.value))
                setType(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex justify-between w-full m-4">
        <div className="w-1/2 ml-3">
          <label htmlFor="pages" className="mb-2 text-sm font-medium">
            تعداد صفحات
          </label>
          <input
            className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            id="pages"
            type="text"
            maxLength={5}
            value={pages}
            onChange={(e) => {
              if (e.target.value === "" || /^\d*$/.test(e.target.value))
                setPages(e.target.value);
            }}
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="copies" className="mb-2 text-sm font-medium">
            تعداد کتاب‌ها
          </label>
          <input
            className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            id="copies"
            type="text"
            maxLength={3}
            value={copies}
            onChange={(e) => {
              if (e.target.value === "" || /^\d*$/.test(e.target.value))
                setCopies(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="w-full m-4">
        <label htmlFor="img" className="mb-2 text-sm font-medium">
          عکس
        </label>
        <input
          className="w-full"
          id="img"
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
      </div>
      <div className="w-full m-4">
        <label htmlFor="summary" className="mb-2 text-sm font-medium">
          خلاصه
        </label>
        <textarea
          className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          id="summary"
          type="text"
          rows={4}
          value={summary}
          onChange={(e) => {
            setSummary(e.target.value);
          }}
        />
      </div>
      <div className="w-full h-5 border-b-2 text-center mt-5 dark:border-gray-300 border-gray-700">
        <span className="text-sm font-medium dark:bg-gray-950 bg-gray-50 text-gray-700 dark:text-gray-300 px-2">
          {" "}
          اطلاعات انتشار
        </span>
      </div>
      <div className="w-full m-4">
        <label htmlFor="publisher" className="mb-2 text-sm font-medium">
          نام ناشر
        </label>
        <input
          className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          id="publisher"
          type="text"
          value={publisher}
          onChange={(e) => {
            if (/^[\u0600-\u06FF\s]*$/.test(e.target.value))
              setPublisher(e.target.value);
          }}
        />
      </div>
      <div className="w-full m-4">
        <label htmlFor="isbn" className="mb-2 text-sm font-medium">
          شابک
        </label>
        <input
          className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          id="isbn"
          type="text"
          maxLength={13}
          minLength={13}
          value={isbn}
          onChange={(e) => {
            if (e.target.value === "" || /^\d*$/.test(e.target.value))
              setISBN(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-between w-full m-4">
        <div className="w-1/2 ml-3">
          <label htmlFor="print-edition" className="mb-2 text-sm font-medium">
            نوبت چاپ
          </label>
          <input
            className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            id="print-edition"
            type="text"
            maxLength={3}
            value={printEdition}
            onChange={(e) => {
              if (e.target.value === "" || /^\d*$/.test(e.target.value))
                setPrintEdition(e.target.value);
            }}
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="print-year" className="mb-2 text-sm font-medium">
            سال چاپ
          </label>
          <input
            className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            id="print-year"
            type="text"
            maxLength={4}
            value={printYear}
            onChange={(e) => {
              if (e.target.value === "" || /^\d*$/.test(e.target.value))
                setPrintYear(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="w-full h-5 border-b-2 text-center mt-5 dark:border-gray-300 border-gray-700">
        <span className="text-sm font-medium dark:bg-gray-950 bg-gray-50 text-gray-700 dark:text-gray-300 px-2">
          اطلاعات نویسنده
        </span>
      </div>
      <div className="w-full m-4 flex flex-col">
        <div className="flex items-center">
          <div className="w-full ml-3">
            <label htmlFor="author" className="mb-2 text-sm font-medium">
              نام نویسنده
            </label>
            <input
              className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              id="author"
              type="text"
              value={author}
              onChange={(e) => {
                if (/^[\u0600-\u06FF\s]*$/.test(e.target.value))
                  setAuthor(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                handleAddAuthor(author);
                setAuthor("");
              }}
              className="mt-5 px-5 py-2.5 font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-wrap">
          {authors &&
            authors.map((a, index) => (
              <div
                key={index}
                className="inline-flex items-center px-2 py-1 me-2 mt-5 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="cursor-pointer"
                  onClick={() =>
                    setAuthors((prev) =>
                      prev.filter((allauthors) => allauthors.name !== a.name)
                    )
                  }
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
                <span className="pl-2">نام: {a.name}</span>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full h-5 border-b-2 text-center mt-5 dark:border-gray-300 border-gray-700">
        <span className="text-sm font-medium dark:bg-gray-950 bg-gray-50 text-gray-700 dark:text-gray-300 px-2">
          اطلاعات مترجم
        </span>
      </div>
      <div className="w-full m-4">
        <div className="flex items-center">
          <div className="w-full ml-3">
            <label htmlFor="translator" className="mb-2 text-sm font-medium">
              نام مترجم
            </label>
            <input
              className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              id="translator"
              type="text"
              value={translator}
              onChange={(e) => {
                if (/^[\u0600-\u06FF\s]*$/.test(e.target.value))
                  setTranslator(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                handleAddTranslator(translator);
                setTranslator("");
              }}
              className="mt-5 px-5 py-2.5 font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-wrap">
          {translators &&
            translators.map((t, index) => (
              <div
                key={index}
                className="inline-flex items-center px-2 py-1 me-2 mt-5 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="cursor-pointer"
                  onClick={() =>
                    setTranslators((prev) =>
                      prev.filter(
                        (alltranslator) => alltranslator.name !== t.name
                      )
                    )
                  }
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
                <span className="pl-2">نام: {t.name}</span>
              </div>
            ))}
        </div>
      </div>

      <button
        type="submit"
        className="px-5 py-2.5 text-lg font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-10 w-full  m-8"
      >
        افزودن کتاب
      </button>
    </form>
  );
};

export default AddBook;
