import PropTypes from "prop-types";

const AllLists = ({ bookDoc }) => {
  return (
    <div className="dark:bg-gray-900 bg-gray-100 p-2 rounded-b-md mt-1">
      {bookDoc.length == 0 ? (
        <span>هیج سندی وجود ندارد.</span>
      ) : (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead className="text-xs bg-gray-200 dark:bg-gray-800">
              <tr className="font-medium">
                <th className="px-2 py-3">شماره سند</th>
                <th className="px-2 py-3">نام کتاب</th>
                <th className="px-2 py-3">کاربر</th>
              </tr>
            </thead>
            {bookDoc.map((bd) => (
              <tr
                key={bd.id}
                className="border-t dark:border-gray-400 border-gray-700"
              >
                <td
                  className={`${
                    bd.returned ? "text-green-500" : "text-red-500"
                  } px-2 py-3`}
                >
                  {bd.id}
                </td>
                <td className="px-2 py-4">{bd.title}</td>
                <td className="px-2 py-4">{bd.name}</td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};
AllLists.propTypes = {
  bookDoc: PropTypes.array.isRequired,
};
export default AllLists;
