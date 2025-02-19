import { useParams, NavLink } from "react-router-dom";
import { supabase } from "../../services/supbase";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Loading from "../../components/loading";
const BookFilter = () => {
  const { table } = useParams();
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const getTags = async () => {
    const { data, error } = await supabase.from(table).select();
    if (error) {
      toast.error(error.message);
      return;
    }
    setTags(data);
    setLoading(false);
  };
  useEffect(() => {
    switch (table) {
      case "genres":
        setName("انواع داستان");
        break;
      case "book_type":
        setName("ادبیات موضوعی");
        break;
      case "book_litrature":
        setName("مکاتب ادبی");
        break;
      case "book_origin":
        setName("ادبیات ملل");
        break;
      case "book_decade":
        setName("دهه");
        break;
    }
  }, [table]);
  useEffect(() => {
    getTags();
  }, []);
  return (
    <>
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <div className="w-4/5 mx-auto my-3 flex flex-col p-2">
          <span className="font-bold text-base md:text-lg flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-yellow-400"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
            </svg>
            {name}
          </span>
          <div className="mt-3 flex flex-wrap">
            {tags.map((d) => (
              <NavLink
                to={`/libraryexplorer/${table}/${d.value}`}
                key={d.id}
                className="m-1 bg-blue-100 text-blue-800 text-sm lg:text-base font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
              >
                {d.value}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BookFilter;
