import PropTypes from "prop-types";
import React, { useState } from "react";
const ReturnedBooks = ({ filteredBooks }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const toggleRow = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };
  return (
    <div className="w-full dark:bg-gray-900 bg-gray-200 rounded-md px-2">
      {filteredBooks.length == 0 ? (
        <span>هیچ سندی وجود ندارد.</span>
      ) : (
        <div className="relative overflow-x-auto mt-5">
          <table className="w-full text-sm text-center">
            <thead className="text-xs">
              <tr>
                <th scope="col" className="px-2 py-3">
                  شماره
                </th>
                <th scope="col" className="px-2 py-3">
                  نام کتاب
                </th>
                <th scope="col" className="px-2 py-3">
                  شابک
                </th>

                <th scope="col" className="px-2 py-3">
                  بیشتر
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((bd, index) => (
                <React.Fragment key={bd.id}>
                  <tr className="border-t border-gray-700 dark:border-gray-500">
                    <td>{index + 1}</td>
                    <td className="px-2 py-4">{bd.title}</td>
                    <td className="px-2 py-4">{bd.book}</td>
                    <td className="px-2 py-4 text-center">
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
                        className="inline-block cursor-pointer"
                        onClick={() => toggleRow(bd.id)}
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                        <path d="M12 9h.01" />
                        <path d="M11 12h1v4h1" />
                      </svg>
                    </td>
                  </tr>
                  {expandedRows[bd.id] && (
                    <tr className="border-none">
                      <td colSpan="8" className=" w-full">
                        <div className="p-4 rounded-b-md bg-gray-300 dark:bg-gray-700">
                          <table className="table-auto w-full text-xs md:text-sm">
                            <tbody>
                              <tr>
                                <td className="font-medium">تاریخ شروع:</td>
                                <td>
                                  {new Date(bd.inserted_at).toLocaleDateString(
                                    "fa"
                                  )}
                                </td>

                                <td className="font-medium">تاریخ برگشت:</td>
                                <td>
                                  {new Date(bd.returned_at).toLocaleDateString(
                                    "fa"
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-medium">تعداد تمدیدها:</td>
                                <td>{bd.renew_count}</td>
                                <td className="font-medium">تاریخ تمدیدها:</td>
                                <td>
                                  {bd.renew_dates.map((brd, index) => (
                                    <span key={index}>
                                      {new Date(brd).toLocaleDateString("fa")} -
                                    </span>
                                  ))}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
ReturnedBooks.propTypes = {
  filteredBooks: PropTypes.array.isRequired,
};
export default ReturnedBooks;
