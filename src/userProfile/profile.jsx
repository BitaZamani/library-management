import { useState } from "react";
import BookDocs from "./BookDocs";
import UserStatics from "./UserStatics";
import UserHeader from "./UserHeader";
import AccountInfo from "./AccountInfo";
import ShowMessages from "./ShowMessages";
const Profile = () => {
  const [activeComponent, setActiveComponent] = useState("");

  const mainComponent = () => {
    switch (activeComponent) {
      default:
        return <UserStatics />;
      case "bookdoc":
        return <BookDocs />;
      case "statics":
        return <UserStatics />;
      case "edit":
        return <AccountInfo />;
      case "messages":
        return <ShowMessages />;
    }
  };
  return (
    <div>
      <UserHeader setActiveComponent={setActiveComponent} />
      <div className="my-5 w-11/12 mx-auto">{mainComponent()}</div>
    </div>
  );
};

export default Profile;
