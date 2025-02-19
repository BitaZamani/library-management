import { useEffect, useState } from "react";
import { supabase } from "../services/supbase";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const ShowMessages = ({ updateUnseenMessagesCount }) => {
  const [messages, setMessages] = useState([]);
  const [expandedMessages, setExpandedMessages] = useState({});
  const openMessage = async (message) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [message.id]: !prev[message.id],
    }));
    if (!message.seen) {
      const { error } = await supabase
        .from("notifications")
        .update({ seen: true })
        .eq("id", message.id);
      if (error) {
        toast.error(error.message);
        return;
      }
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, seen: true } : msg
        )
      );
    }
    updateUnseenMessagesCount();
  };

  const getMessages = async () => {
    const { data, error } = await supabase.from("notifications").select();
    if (error) {
      toast.error(error.message);
      return;
    }
    setMessages(data);
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="rounded-md">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`flex flex-col text-sm md:text-base my-1 ${
            message.seen ? "opacity-75" : "opacity-100"
          }`}
        >
          <div className="bg-gray-200 dark:bg-gray-900 p-3 rounded-sm flex justify-between">
            <div>
              <span
                className={`${
                  message.seen ? "text-green-500" : "text-red-500"
                }`}
              >{`${index + 1}- `}</span>
              <span className="pl-5">{message.header}</span>
              <span className="pl-5">
                {new Date(message.time).toLocaleDateString("fa")}
              </span>
            </div>
            <button
              onClick={() => openMessage(message)}
              className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              نمایش متن پیام
            </button>
          </div>
          {expandedMessages[message.id] && (
            <span className="dark:bg-gray-800 p-3 rounded-b-lg">
              {message.message}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
ShowMessages.propTypes = {
  updateUnseenMessagesCount: PropTypes.func.isRequired,
};
export default ShowMessages;
