// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { supabase } from "../../services/supbase";
// import Search from "../../components/Search";
// const EditBook = () => {
//   const [isbn, setISBN] = useState("");
//   const [book, setBook] = useState([]);
//   const getBook = async () => {
//     if (isbn.trim().length !== 10) {
//       toast.error("کد ملی را درست وارد کنید.");
//       return;
//     }
//     try {
//       const { data, error } = await supabase
//         .from("books")
//         .select("*")
//         .eq("isbn", isbn)
//         .maybeSingle();
//       if (error) {
//         toast.error(error.message);
//         return;
//       }

//       if (!data) {
//         toast.error("کتاب یافت نشد.");
//         return;
//       }

//       setBook(data);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   useEffect(() => {
//     if (isbn.trim() === "") {
//       setBook("");
//     }
//   }, [isbn]);
//   return (
//     <div className="flex justify-center items-center flex-col w-4/5 mx-auto my-auto">
//       <div className="w-full">
//         <Search
//           value={isbn}
//           setValue={setISBN}
//           handleSearch={getBook}
//           searchName={"شابک"}
//         />
//       </div>
//     </div>
//   );
// };

// export default EditBook;
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../services/supbase";
import Search from "../../components/Search";

const EditBook = () => {
  const [isbn, setISBN] = useState("");
  const [book, setBook] = useState(null);
  const [formData, setFormData] = useState({
    authors: [],
    translators: [],
    genres: [],
    litratures: [],
    delete_authors: [],
    delete_genres: [],
    delete_litratures: [],
  });

  const getBook = async () => {
    if (isbn.trim().length !== 13) {
      toast.error("شابک را درست وارد کنید.");
      return;
    }
    try {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("isbn", isbn)
        .maybeSingle();

      if (error) {
        toast.error(error.message);
        return;
      }
      if (!data) {
        toast.error("کتاب یافت نشد.");
        return;
      }
      setBook(data);
      setFormData(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isbn.trim() === "") {
      setBook(null);
      setFormData({});
    }
  }, [isbn]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.rpc("editbook", {
        book_id: book.id,
        title: formData.title,
        pages: formData.pages,
        copies: formData.copies,
        type_value: formData.type,
        summary: formData.summary,
        book_isbn: formData.isbn,
        img: formData.img,
        publisher_name: formData.publisher,
        mainLang: formData.main_lang,
        transLang: formData.trans_lang,
        published_year: formData.published_year,
        print_edition: formData.print_edition,
        print_year: formData.print_year,
        origin_value: formData.origin,
        decade_value: formData.decade,
        authors: formData.authors,
        translators: formData.translators,
        genres: formData.genres,
        litratures: formData.litratures,
        delete_authors: formData.delete_authors,
        delete_genres: formData.delete_genres,
        delete_litratures: formData.delete_litratures,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("کتاب با موفقیت ویرایش شد.");
        getBook(); // Refresh book details
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-4/5 mx-auto">
      <Search
        value={isbn}
        setValue={setISBN}
        handleSearch={getBook}
        searchName="شابک"
      />
      {book && (
        <form
          className="w-full mt-4 p-4 border rounded"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            placeholder="عنوان کتاب"
            className="input"
          />
          <input
            type="number"
            name="pages"
            value={formData.pages || ""}
            onChange={handleChange}
            placeholder="تعداد صفحات"
            className="input"
          />
          <input
            type="number"
            name="copies"
            value={formData.copies || ""}
            onChange={handleChange}
            placeholder="نسخ موجود"
            className="input"
          />
          <input
            type="text"
            name="type"
            value={formData.type || ""}
            onChange={handleChange}
            placeholder="نوع"
            className="input"
          />
          <textarea
            name="summary"
            value={formData.summary || ""}
            onChange={handleChange}
            placeholder="خلاصه"
            className="input"
          />
          <input
            type="text"
            name="isbn"
            value={formData.isbn || ""}
            onChange={handleChange}
            placeholder="شابک"
            className="input"
          />
          <input
            type="text"
            name="publisher"
            value={formData.publisher || ""}
            onChange={handleChange}
            placeholder="ناشر"
            className="input"
          />
          <input
            type="text"
            name="main_lang"
            value={formData.main_lang || ""}
            onChange={handleChange}
            placeholder="زبان اصلی"
            className="input"
          />
          <input
            type="text"
            name="trans_lang"
            value={formData.trans_lang || ""}
            onChange={handleChange}
            placeholder="زبان ترجمه"
            className="input"
          />
          <input
            type="number"
            name="published_year"
            value={formData.published_year || ""}
            onChange={handleChange}
            placeholder="سال انتشار"
            className="input"
          />
          <input
            type="number"
            name="print_edition"
            value={formData.print_edition || ""}
            onChange={handleChange}
            placeholder="چاپ"
            className="input"
          />
          <input
            type="number"
            name="print_year"
            value={formData.print_year || ""}
            onChange={handleChange}
            placeholder="سال چاپ"
            className="input"
          />
          <input
            type="text"
            name="origin"
            value={formData.origin || ""}
            onChange={handleChange}
            placeholder="منشأ"
            className="input"
          />
          <input
            type="text"
            name="decade"
            value={formData.decade || ""}
            onChange={handleChange}
            placeholder="دهه"
            className="input"
          />
          <input
            type="text"
            name="authors"
            value={formData.authors.join(", ") || ""}
            onChange={(e) => handleArrayChange("authors", e.target.value)}
            placeholder="نویسندگان (با کاما جدا کنید)"
            className="input"
          />
          <input
            type="text"
            name="translators"
            value={formData.translators.join(", ") || ""}
            onChange={(e) => handleArrayChange("translators", e.target.value)}
            placeholder="مترجمان (با کاما جدا کنید)"
            className="input"
          />
          <input
            type="text"
            name="genres"
            value={formData.genres.join(", ") || ""}
            onChange={(e) => handleArrayChange("genres", e.target.value)}
            placeholder="ژانرها (با کاما جدا کنید)"
            className="input"
          />
          <input
            type="text"
            name="litratures"
            value={formData.litratures.join(", ") || ""}
            onChange={(e) => handleArrayChange("litratures", e.target.value)}
            placeholder="ادبیات (با کاما جدا کنید)"
            className="input"
          />
          <button type="submit" className="btn mt-2">
            ویرایش کتاب
          </button>
        </form>
      )}
    </div>
  );
};

export default EditBook;
