import PropTypes from "prop-types";

const ReturnedListsLists = ({ bookDoc }) => {
  const filteredDocs = bookDoc.filter((bd) => bd.returned === true);
  return (
    <div className="dark:bg-gray-900 bg-gray-100 p-2 rounded-b-md mt-1">
      {filteredDocs.length == 0 ? (
        <span>هیج سندی وجود ندارد.</span>
      ) : (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead className="text-xs bg-gray-200 dark:bg-gray-800">
              <tr className="font-medium">
                <th className="px-2 py-3">شماره سند</th>
                <th className="px-2 py-3">نام کتاب</th>
                <th className="px-2 py-3">کاربر</th>
                <th className="px-2 py-3">تاریخ امانت</th>
                <th className="px-2 py-3">کارمند</th>
                <th className="px-2 py-3">تاریخ برگشت</th>
                <th className="px-2 py-3">کارمند</th>
                <th className="px-2 py-3">جریمه</th>
              </tr>
            </thead>
            {filteredDocs.map((fd) => (
              <tr
                key={fd.id}
                className="border-t dark:border-gray-400 border-gray-700"
              >
                <td className="px-2 py-4">{fd.id}</td>
                <td className="px-2 py-4">{fd.title}</td>
                <td className="px-2 py-4">{fd.name}</td>
                <td className="px-2 py-4">
                  {new Date(fd.inserted_at).toLocaleDateString("fa")}
                </td>
                <td className="px-2 py-4">{fd.borrow_staff}</td>
                <td className="px-2 py-4">
                  {new Date(fd.returned_at).toLocaleDateString("fa")}
                </td>
                <td className="px-2 py-4">{fd.return_staff}</td>
                <td className="px-2 py-4">{fd.total_fines}</td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};
ReturnedListsLists.propTypes = {
  bookDoc: PropTypes.array.isRequired,
};
export default ReturnedListsLists;
