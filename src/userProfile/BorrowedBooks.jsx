import React, { useState } from "react";
import { supabase } from "../services/supbase";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
const BorrowedBooks = ({ getBookDocs, filteredBooks, userID }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const toggleRow = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };
  const renewBook = async (isbn, id) => {
    let { error } = await supabase.rpc("renewnbookasuser", {
      book_isbn: isbn,
      user_id: id,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("کتاب با موفقیت تمدید شد.");
    getBookDocs();
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
                  روزهای باقی‌مانده
                </th>
                <th scope="col" className="px-2 py-3">
                  تمدید
                </th>
                <th scope="col" className="px-2 py-3">
                  بیشتر
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((fb, index) => (
                <React.Fragment key={fb.id}>
                  <tr className="border-t border-gray-700 dark:border-gray-500">
                    <td>{index + 1}</td>
                    <td className="px-2 py-4">{fb.title}</td>
                    <td className="px-2 py-4">{fb.book}</td>
                    <td className="px-2 py-4">{fb.remained_days}</td>
                    <td className="px-2 py-4 flex justify-center items-center">
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
                        onClick={() => renewBook(fb.book, userID)}
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" />
                        <path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" />
                      </svg>
                    </td>

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
                        className="inline-block"
                        onClick={() => toggleRow(fb.id)}
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                        <path d="M12 9h.01" />
                        <path d="M11 12h1v4h1" />
                      </svg>
                    </td>
                  </tr>
                  {expandedRows[fb.id] && (
                    <tr className="border-none">
                      <td colSpan="8" className=" w-full">
                        <React.Fragment className="p-4 rounded-b-lg bg-gray-300 dark:bg-gray-700">
                          <table className="table-auto w-full text-sm">
                            <tbody>
                              <tr>
                                <td className="font-medium">تاریخ شروع:</td>
                                <td className="">
                                  {new Date(fb.inserted_at).toLocaleDateString(
                                    "fa"
                                  )}
                                </td>

                                <td className="font-medium">مهلت:</td>
                                <td>
                                  {new Date(fb.doe_date).toLocaleDateString(
                                    "fa"
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-medium">تعداد تمدیدها:</td>
                                <td>{fb.renew_count}</td>
                                <td className="font-medium">تاریخ تمدیدها:</td>
                                {fb.renew_dates.map((brd, index) => (
                                  <span key={index}>
                                    {new Date(brd).toLocaleDateString("fa")}
                                  </span>
                                ))}
                              </tr>
                              <tr>
                                <td className="font-medium">تاخیر:</td>
                                <td>{fb.delay}</td>
                                <td className="font-medium">جریمه کل:</td>
                                <td>{fb.total_fines}</td>
                              </tr>
                            </tbody>
                          </table>
                        </React.Fragment>
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
BorrowedBooks.propTypes = {
  getBookDocs: PropTypes.func.isRequired,
  filteredBooks: PropTypes.array.isRequired,
  userID: PropTypes.string.isRequired,
};
export default BorrowedBooks;
