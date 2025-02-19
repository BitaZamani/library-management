import PropTypes from "prop-types";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AllBooks = ({ bookDoc }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const toggleRow = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };
  return (
    <div className="w-full dark:bg-gray-900 bg-gray-200 rounded-md px-2">
      {bookDoc.length == 0 ? (
        <span>هیچ سندی وجود ندارد.</span>
      ) : (
        <div className="relative overflow-x-auto mt-5">
          <table className="w-full text-sm text-center">
            <thead className="text-xs">
              <tr className="font-medium whitespace-nowrap">
                <th scope="col" className="px-6 py-3">
                  شماره
                </th>
                <th scope="col" className="px-6 py-3">
                  نام کتاب
                </th>
                <th scope="col" className="px-6 py-3">
                  شابک
                </th>
                <th scope="col" className="px-6 py-3">
                  بیشتر
                </th>
              </tr>
            </thead>
            <tbody>
              {bookDoc.map((bd, index) => (
                <React.Fragment key={bd.id}>
                  <tr className="border-t border-gray-700 dark:border-gray-500 text-center">
                    <td
                      className={`${
                        bd.returned ? "text-green-600 " : "text-red-600 "
                      }`}
                    >
                      {index + 1}
                    </td>
                    <td>
                      <NavLink to={`/bookinfo/${bd.book}`}>{bd.title}</NavLink>
                    </td>
                    <td className="px-2 py-4">{bd.book}</td>
                    <td className="px-2 py-4 flex justify-center">
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
                        <div className="p-4 rounded-b-lg bg-gray-300 dark:bg-gray-700">
                          <table className="table-auto w-full text-sm">
                            <tbody>
                              <tr>
                                <td>تاخیر:</td>
                                <td>{bd.delay}</td>
                                <td className="font-medium">جریمه کل:</td>
                                <td>{bd.total_fines}</td>
                              </tr>

                              <tr>
                                <td className="font-medium">
                                  بدهی پرداخت شده:
                                </td>
                                <td>{bd.settles}</td>
                                <td className="font-medium"> بدهی مانده:</td>
                                <td>{bd.fines}</td>
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
AllBooks.propTypes = {
  bookDoc: PropTypes.array.isRequired,
};

export default AllBooks;
