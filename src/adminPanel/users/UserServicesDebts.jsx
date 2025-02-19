import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supbase";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import Loading from "../../components/loading";

export const UserDebts = ({ userID, uid, setValue }) => {
  const [userDebt, setUserDebt] = useState([]);
  const [userStat, setUserStat] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleRow = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const getUserStat = async () => {
    setLoading(false);
    const { data, error } = await supabase
      .from("userstatsforadmin")
      .select()
      .eq("id_number", userID)
      .single();
    if (error) {
      toast.error(error.message);
      return;
    }
    setUserStat(data);
    setLoading(true);
  };

  const getDebts = async () => {
    const { data, error } = await supabase
      .from("bookdocforadmin")
      .select("*")
      .eq("id_number", userID);
    if (error) {
      toast.error(error.message);
      return;
    }
    setUserDebt(data);
  };

  const resetFines = async (uid) => {
    const { error } = await supabase.rpc("resetfines", {
      user_id: uid,
    });

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("بدهی شما پرداخت شد.");
    getDebts();
  };

  useEffect(() => {
    getDebts();
    getUserStat();
  }, []);

  return (
    <div className="w-full mt-5">
      <div className="flex justify-between dark:bg-gray-900 bg-gray-100 p-2 rounded-t-md mb-2">
        <span className="text-sm font-medium">حساب مالی کاربر</span>
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
      {loading ? (
        <>
          <div className="flex flex-col sm:justify-evenly text-sm md:text-base dark:bg-gray-900 bg-gray-100 p-2">
            <div className="flex flex-col md:flex-row justify-evenly">
              <span className="pb-1">{`همه کتاب‌ها: ${userStat.all_books}`}</span>
              <span className="pb-1">{`کتاب‌های دست کاربر: ${userStat.books_in_hand}`}</span>
              <span className="pb-1">{`کتاب های برگشته: ${
                userStat.all_books - userStat.books_in_hand
              }`}</span>
            </div>
            <div className="flex flex-col md:flex-row justify-evenly">
              <span className="pb-1">{`بدهی کلی ${userStat.total_fines}`}</span>
              <span className="pb-1">{`تسویه شده: ${userStat.settles}`}</span>
              <span className="pb-1">{`بدهی مانده: ${userStat.debts}`}</span>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <button
              onClick={() => {
                setShowMore((prev) => !prev);
                setExpandedRows({});
              }}
              className="flex items-center"
            >
              نمایش ریز جزئیات
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-down"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 7l5 5l5 -5" />
                <path d="M7 13l5 5l5 -5" />
              </svg>
            </button>
            <button
              onClick={() => resetFines(uid)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ‌پرداخت تمامی جریمه‌ها
            </button>
          </div>

          {showMore && (
            <div className="relative overflow-x-auto mt-5 bg-gray-100 dark:bg-gray-900 rounded-b-md p-1">
              <table className="w-full text-sm text-right">
                <thead className="text-xs bg-gray-200 dark:bg-gray-800">
                  <tr>
                    <th className="px-2 py-3">
                      شماره سند
                    </th>
                    <th className="px-2 py-3">
                      نام کتاب
                    </th>
                    <th className="px-2 py-3">
                      بدهی کلی
                    </th>
                    <th className="px-2 py-3">
                      بدهی باقی‌مانده
                    </th>
                    <th className="px-2 py-3">
                      بیشتر
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userDebt.map((ud) => (
                    <React.Fragment key={ud.id}>
                      <tr className="border-t dark:border-gray-400 border-gray-700">
                        <td
                          className={`${
                            ud.returned && ud.balanced
                              ? "text-green-500"
                              : "text-red-500"
                          } px-2 py-4`}
                        >
                          {ud.id}
                        </td>
                        <td className="px-2 py-4">{ud.title}</td>
                        <td className="px-2 py-4">{ud.total_fines}</td>
                        <td className="px-2 py-4">{ud.fines}</td>
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
                            className="icon icon-tabler icons-tabler-outline icon-tabler-info-circle cursor-pointer"
                            onClick={() => toggleRow(ud.id)}
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                            <path d="M12 9h.01" />
                            <path d="M11 12h1v4h1" />
                          </svg>
                        </td>
                      </tr>
                      {expandedRows[ud.id] && (
                        <tr className="border-none dark:bg-gray-800">
                          <td colSpan="8" className="w-full">
                            <div className="p-4 rounded-b-lg bg-gray-200 dark:bg-gray-800">
                              <table className="table-auto w-full text-sm">
                                <tbody>
                                  <tr>
                                    <td className="font-medium">تاریخ شروع:</td>
                                    <td className="pl-4">
                                      {new Date(
                                        ud.inserted_at
                                      ).toLocaleDateString("fa")}
                                    </td>
                                    <td className="font-medium">کارمند:</td>
                                    <td>{ud.borrow_staff}</td>
                                  </tr>
                                  <tr>
                                    <td>تاریخ برگشت:</td>
                                    <td className="pl-4">
                                      {ud.returned_at
                                        ? new Date(
                                            ud.returned_at
                                          ).toLocaleDateString("fa")
                                        : "-"}
                                    </td>
                                    <td className="font-medium">کارمند:</td>
                                    <td>{ud.return_staff || "-"}</td>
                                  </tr>
                                  <tr>
                                    <td className="font-medium">
                                      تعداد تمدیدها:
                                    </td>
                                    <td>{ud.renew_count}</td>
                                    <td className="font-medium">
                                      تاریخ تمدیدها:
                                    </td>
                                    <td>
                                      {ud.renew_dates
                                        ? ud.renew_dates.map((rd) =>
                                            new Date(rd).toLocaleDateString(
                                              "fa"
                                            )
                                          )
                                        : "-"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="font-medium">جریمه کل:</td>
                                    <td>{ud.total_fines}</td>
                                    <td className="font-medium">پرداخت شده:</td>
                                    <td>{ud.settles}</td>
                                    <td className="font-medium">مانده:</td>
                                    <td>{ud.fines}</td>
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
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
UserDebts.propTypes = {
  userID: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};
