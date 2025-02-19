import BorrowReservedBooks from "./BorrowReservedBooks";
import BorrowBook from "./BorrowBook";
import PropTypes from "prop-types";
import { useState } from "react";
export const Borrow = ({ staff_id, setValue, user_id }) => {
  const [type, setType] = useState("grant");
  return (
    <div className="w-full">
      <div className="flex justify-between dark:bg-gray-900 bg-gray-100 p-2 rounded-t-md mt-5">
        <span className="text-sm font-medium">امانت‌دهی</span>
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
      <div className="flex justify-end my-2">
        <select
          id="default"
          defaultValue={"grant"}
          className="block py-3 text-sm bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer dark:bg-gray-950"
          onChange={(e) => setType(e.target.value)}
        >
          <option id="grant" value="grant">
            امانت
          </option>
          <option id="reserved" value="reserved">
            کتاب‌های رزرو شده
          </option>
        </select>
      </div>
      {type === "reserved" && (
        <BorrowReservedBooks user_id={user_id} staff_id={staff_id} />
      )}
      {type === "grant" && <BorrowBook staff_id={staff_id} user_id={user_id} />}
    </div>
  );
};
Borrow.propTypes = {
  staff_id: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  user_id: PropTypes.string.isRequired,
};
