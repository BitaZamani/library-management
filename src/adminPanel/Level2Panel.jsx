import { useState } from "react";
import VerifyUsers from "./users/VerifyUsers";
import AddUser from "./users/AddUser";
import DashStatics from "./dashStatics";
import AddBook from "./books/AddBook";
import ShowUsers from "./users/showUsers";
import UserServices from "./users/UserServices";
import ShowBooks from "./books/ShowBooks";
import BookTables from "./books/BookTables";
import ShowComments from "./comments/ShowComments";
import AdminHeader from "./AdminHeader";
import AdminInfo from "./AdminInfo";
const Level2Panel = () => {
  const [activeComponent, setActiveComponent] = useState("");

  const mainComponent = () => {
    switch (activeComponent) {
      default:
        return <DashStatics />;
      case "dashboard":
        return <DashStatics />;
      case "userservices":
        return <UserServices />;
      case "showusers":
        return <ShowUsers />;
      case "adduser":
        return <AddUser />;
      case "verify":
        return <VerifyUsers />;
      case "showBooks":
        return <ShowBooks />;
      case "addbook":
        return <AddBook />;
      case "bookTables":
        return <BookTables />;
      case "showcomment":
        return <ShowComments />;
      case "admininfo":
        return <AdminInfo />;
    }
  };

  return (
    <div>
      <AdminHeader setActiveComponent={setActiveComponent} />
      <div className="mt-16 md:mr-52">{mainComponent()}</div>
    </div>
  );
};

export default Level2Panel;
