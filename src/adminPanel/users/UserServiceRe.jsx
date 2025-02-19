import React from "react";
import { supabase } from "../../services/supbase";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import PropTypes from "prop-types";
export const ReturnAndRenew = ({ staff_id, setValue, user_id }) => {
  const [bookDoc, setBookDoc] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [loading, setLoading] = useState(true);
  const toggleRow = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };
  const renew = async (isbn) => {
    const { error } = await supabase.rpc("renewbook", {
      book_isbn: isbn,
      user_id,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("کتاب با موفقیت تمدید شد.");
    getBookDocs(user_id);
  };
  const returnbook = async (isbn) => {
    const { error } = await supabase.rpc("returnbook", {
      book_isbn: isbn,
      user_id,
      staff_id,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("کتاب با موفقیت برگشت داده شد.");
    getBookDocs();
  };
  const getBookDocs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookdocforadmin")
      .select("*")
      .eq("member", user_id)
      .eq("returned", false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setLoading(false);
    setBookDoc(data);
  };
  const resetFine = async (id) => {
    const { error } = await supabase.rpc("resetfine", {
      bookdoc_id: id,
    });

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("بدهی شما پرداخت شد.");
  };
  useEffect(() => {
    getBookDocs();
  }, [user_id]);
  return (
    <div className="w-full">
      <div className="flex justify-between dark:bg-gray-900 bg-gray-100 p-2 rounded-t-md mt-5">
        <span className="text-sm font-medium">مدیریت کتاب‌ها</span>
        <button onClick={() => setValue("mission")}>
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-square-arrow-left"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 8l-4 4l4 4" />
            <path d="M16 12h-8" />
            <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
          </svg>
        </button>
      </div>
      {!loading ? (
        <div className="dark:bg-gray-900 bg-gray-100 p-2 rounded-b-md mt-1">
          {bookDoc.length == 0 ? (
            <span>کتابی در دست کاربر وجود ندارد.</span>
          ) : (
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-center">
                <thead className="text-xs bg-gray-200 dark:bg-gray-800">
                  <tr className="font-medium">
                    <th className="px-2 py-3">نام کتاب</th>
                    <th className="px-2 py-3">مدت زمان باقی مانده</th>
                    <th className="px-2 py-3">تاخیر</th>
                    <th className="px-2 py-3">جریمه</th>
                    <th className="px-2 py-3">تمدید</th>
                    <th className="px-2 py-3">برگشت</th>
                    <th className="px-2 py-3">تسویه</th>
                    <th className="px-2 py-3">بیشتر</th>
                  </tr>
                </thead>
                <tbody>
                  {bookDoc.map((bd) => (
                    <React.Fragment key={bd.id}>
                      <tr className="border-t dark:border-gray-400 border-gray-700">
                        <td className="px-2 py-4">{bd.title}</td>
                        <td className="px-2 py-4">{bd.remained_days}</td>
                        <td className="px-2 py-4">{bd.delay}</td>
                        <td className="px-2 py-4">{bd.fines}</td>
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
                            className="cursor-pointer inline-block"
                            onClick={() => renew(bd.book)}
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
                            className="cursor-pointer inline-block"
                            onClick={() => returnbook(bd.book)}
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 14l-4 -4l4 -4" />
                            <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
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
                            className="cursor-pointer inline-block"
                            onClick={() => resetFine(bd.id)}
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M13 21h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" />
                            <path d="M16 3v4" />
                            <path d="M8 3v4" />
                            <path d="M4 11h12.5" />
                            <path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                            <path d="M19 21v1m0 -8v1" />
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
                            className="cursor-pointer inline-block"
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
                          <td
                            colSpan="8"
                            className="w-full p-4 rounded-b-lg bg-gray-200 dark:bg-gray-800"
                          >
                            <table className="table-auto w-full text-xs">
                              <tbody>
                                <tr>
                                  <td className="font-medium">تاریخ شروع:</td>
                                  <td>
                                    {new Date(
                                      bd.inserted_at
                                    ).toLocaleDateString("fa")}
                                  </td>
                                  <td className="font-medium">کارمند:</td>
                                  <td>{bd.borrow_staff}</td>
                                </tr>
                                <tr>
                                  <td className="font-medium">
                                    تعداد تمدیدها:
                                  </td>
                                  <td>{bd.renew_count}</td>
                                  <td className="font-medium">
                                    تاریخ تمدیدها:
                                  </td>
                                  <td>
                                    {bd.renew_dates.map((brd, index) => (
                                      <span key={index}>
                                        {new Date(brd).toLocaleDateString("fa")}
                                        -
                                      </span>
                                    ))}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="font-medium">مهلت:</td>
                                  <td>
                                    {new Date(bd.doe_date).toLocaleDateString(
                                      "fa"
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="font-medium">جریمه کل:</td>
                                  <td>{bd.total_fines}</td>
                                  <td className="font-medium">بدهی مانده:</td>
                                  <td>{bd.fines}</td>
                                </tr>
                              </tbody>
                            </table>
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
      ) : (
        <Loading />
      )}
    </div>
  );
};
ReturnAndRenew.propTypes = {
  staff_id: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  user_id: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
