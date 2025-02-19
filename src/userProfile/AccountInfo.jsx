import { useState } from "react";
import EditPersonalInfo from "./EditPersonalInfo";
import AccountsMenu from "./AccountsMenu";
import EditAccountInfo from "./EditAccountInfo";
import FinanceInfo from "./FinanceInfo";
const AccountInfo = () => {
  const [activeComponent, setActiveComponent] = useState("");

  const mainComponent = () => {
    switch (activeComponent) {
      default:
        return <AccountsMenu setActiveComponent={setActiveComponent} />;
      case "menu":
        return <AccountsMenu setActiveComponent={setActiveComponent} />;
      case "personalinfo":
        return <EditPersonalInfo setActiveComponent={setActiveComponent} />;
      case "accountinfo":
        return <EditAccountInfo setActiveComponent={setActiveComponent} />;
      case "finance":
        return <FinanceInfo setActiveComponent={setActiveComponent} />;
    }
  };
  return <div>{mainComponent()}</div>;
};

export default AccountInfo;
