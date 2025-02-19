import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supbase";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Reservations = ({ book }) => {
  const { user } = useAuth();
  const [isReserved, setIsReserved] = useState(false);
  const [isWaited, setIsWaited] = useState(false);
  const user_id = user?.id;
  const book_id = book.book_id;

  const reserveBook = async () => {
    setIsReserved(false);
    let { error } = await supabase.rpc("reservebook", {
      book_id,
      user_id,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    setIsReserved(true);
    toast.success("کتاب با موفقیت رزرو شد.");
  };

  const Reservation = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("book_reservation")
        .select()
        .eq("user_id", user.id)
        .eq("book_id", book_id)
        .maybeSingle();

      if (error) {
        setIsReserved(false);
        return;
      }
      if (data) setIsReserved(true);
    }
  };

  const getToWaiting = async () => {
    const { error } = await supabase.rpc("bookwaitinglist", {
      book_id,
      user_id,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    setIsWaited(true);
    toast.success(
      "شما به لیست انتظار اضافه شدید. درصورت موجود شدن کتاب به شما اطلاع داده می‌شود."
    );
  };

  const waiting = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("user_waiting")
        .select()
        .eq("user_id", user.id)
        .eq("book_id", book_id)
        .maybeSingle();

      if (error) {
        setIsWaited(false);
        return;
      }
      if (data) setIsWaited(true);
    }
  };

  useEffect(() => {
    if (user) {
      Reservation();
      waiting();
    }
  }, [user]);

  return (
    <div
      className={`${
        book.available_copies !== 0 ? "bg-green-200" : "bg-red-200"
      } flex flex-wrap mt-2 py-2 px-3 text-black`}
    >
      {isReserved ? (
        <span>کتاب توسط شما رزرو شده است.</span>
      ) : book.available_copies !== 0 ? (
        <div className="flex flex-wrap items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            color="green"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M9 12l2 2l4 -4" />
          </svg>
          <span className="ml-2">موجود</span>
          <button
            onClick={reserveBook}
            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-700 focus:outline-none font-medium rounded-lg text-sm px-6 py-2 text-center me-2 mb-2 dark:border-green-900 dark:text-green-900 dark:hover:text-white dark:hover:bg-green-600 mt-2"
          >
            رزرو
          </button>
        </div>
      ) : isWaited ? (
        <span>شما در صف انتظار این کتاب قرار دارید.</span>
      ) : (
        <div className="flex items-center">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              color="red"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" />
              <path d="M9 8l6 8" />
              <path d="M15 8l-6 8" />
            </svg>
            <span className="ml-2">عدم موجودی</span>
          </div>
          <button
            onClick={getToWaiting}
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 mt-2"
          >
            صف انتظار
          </button>
        </div>
      )}
    </div>
  );
};

Reservations.propTypes = {
  book: PropTypes.object.isRequired,
};

export default Reservations;
