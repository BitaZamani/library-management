import NavBar from "../../components/NavBar";
const FAQ = () => {
  return (
    <>
      <NavBar />
      <div className="w-4/5 mx-auto my-3">
        <h1 className="md:text-lg text-base font-semibold">سوالات متداول</h1>
        <ul className="divide-y rounded-xl mt-2">
          <li>
            <details className="group">
              <summary className="flex items-center gap-3 px-4 py-3 font-medium hover:cursor-pointer bg-gray-300 dark:bg-gray-900">
                <svg
                  className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  ></path>
                </svg>
                <span>سوال 1</span>
              </summary>

              <article className="dark:bg-gray-700 py-3 px-10 bg-gray-100">
                <p>جواب 1</p>
              </article>
            </details>
          </li>
          <li>
            <details className="group">
              <summary className="flex items-center gap-3 px-4 py-3 font-medium bg-gray-300 dark:bg-gray-900 hover:cursor-pointer">
                <svg
                  className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  ></path>
                </svg>
                <span>سوال 2</span>
              </summary>

              <article className="dark:bg-gray-700 py-3 px-10 bg-gray-100">
                <p>جواب 2</p>
              </article>
            </details>
          </li>
          <li>
            <details className="group">
              <summary className="flex items-center gap-3 px-4 py-3 font-medium bg-gray-300 dark:bg-gray-900 hover:cursor-pointer">
                <svg
                  className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  ></path>
                </svg>
                <span>سوال 3</span>
              </summary>

              <article className="dark:bg-gray-700 py-3 px-10 bg-gray-100">
                <p>جواب 3</p>
              </article>
            </details>
          </li>
          <li>
            <details className="group">
              <summary className="flex items-center gap-3 px-4 py-3 font-medium bg-gray-300 dark:bg-gray-900 hover:cursor-pointer">
                <svg
                  className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  ></path>
                </svg>
                <span>سوال 4</span>
              </summary>

              <article className="dark:bg-gray-700 py-3 px-10 bg-gray-100">
                <p>جواب 4</p>
              </article>
            </details>
          </li>
        </ul>
      </div>
    </>
  );
};

export default FAQ;
