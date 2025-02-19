import { useState } from "react";
import { ShowInfo } from "./ShowInfo";
import AccountOptions from "./AccountOptions";
import UserStatus from "./UserStatus";
import PropTypes from "prop-types";
const AccountInfo = ({ userinfo, setValue }) => {
  const [activeComponent, setActiveComponent] = useState("");
  const mainComponent = () => {
    switch (activeComponent) {
      default:
        return (
          <AccountOptions
            setActiveComponent={setActiveComponent}
            userinfo={userinfo}
            setValue={setValue}
          />
        );
      case "showinfo":
        return (
          <ShowInfo
            userinfo={userinfo}
            setActiveComponent={setActiveComponent}
          />
        );
      case "menu":
        return (
          <AccountOptions
            setActiveComponent={setActiveComponent}
            userinfo={userinfo}
            setValue={setValue}
          />
        );
      case "status":
        return (
          <UserStatus
            userinfo={userinfo}
            setActiveComponent={setActiveComponent}
          />
        );
    }
  };
  return <div className="w-full">{mainComponent()}</div>;
};
AccountInfo.propTypes = {
  userinfo: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
};
export default AccountInfo;
