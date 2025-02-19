const Search = ({ value, setValue, handleSearch, searchName }) => {
  return (
    <div>
      <form className="max-w-md mx-auto mt-5 w-full">
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block w-full p-2 ps-6 text-sm md:text-base border border-gray-300 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={searchName}
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button
            type="button"
            className="absolute end-2.5 bottom-2.5"
            onClick={handleSearch}
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-search"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
