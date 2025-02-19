import { useState, useEffect } from "react";
import { supabase } from "../services/supbase";
import toast from "react-hot-toast";

const AdvancedSearch = () => {
  const [lits, setLits] = useState([]);
  const [decs, setDecs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [types, setTypes] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [tags, setTags] = useState([]);

  const fetchData = async () => {
    try {
      const [genres, decs, orgs, lits, types, pubs] = await Promise.all([
        supabase.from("genres").select(),
        supabase.from("book_decade").select(),
        supabase.from("book_origin").select(),
        supabase.from("book_litrature").select(),
        supabase.from("book_type").select(),
        supabase.from("publishers").select(),
      ]);
      setDecs(decs.data);
      setGenres(genres.data);
      setOrigins(orgs.data);
      setLits(lits.data);
      setTypes(types.data);
      setPublishers(pubs.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    setTags((prev) =>
      checked ? [...prev, value] : prev.filter((tag) => tag !== value)
    );
    console.log(tags);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <span className="font-semibold">ژانرها</span>
        <div>
          {genres.map((genre) => (
            <div key={genre.id} className="flex items-center">
              <input
                type="checkbox"
                value={genre.value}
                onChange={handleTagChange}
                className="mr-2"
              />
              <label>{genre.value}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <span className="font-semibold">ادبیات موضوعی</span>
        <div>
          {lits.map((lit) => (
            <div key={lit.id} className="flex items-center">
              <input
                type="checkbox"
                value={lit.value}
                onChange={handleTagChange}
                className="mr-2"
              />
              <label>{lit.value}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <span className="font-semibold">دهه</span>
        <div>
          {decs.map((dec) => (
            <div key={dec.id} className="flex items-center">
              <input
                type="checkbox"
                value={dec.value}
                onChange={handleTagChange}
                className="mr-2"
              />
              <label>{dec.value}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <span className="font-semibold">ادبیات ملل</span>
        <div>
          {origins.map((org) => (
            <div key={org.id} className="flex items-center">
              <input
                type="checkbox"
                value={org.value}
                onChange={handleTagChange}
                className="mr-2"
              />
              <label>{org.value}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <span className="font-semibold">دهه</span>
        <div>
          {publishers.map((pub) => (
            <div key={pub.id} className="flex items-center">
              <input
                type="checkbox"
                value={pub.value}
                onChange={handleTagChange}
                className="mr-2"
              />
              <label>{pub.value}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
