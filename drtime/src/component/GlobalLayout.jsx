import { Outlet } from "react-router-dom";
import Header from "./Header";
const GlobalLayout = ({ logOut }) => {
  return (
    <div>
      <Header logOut={logOut} />
      <Outlet />
    </div>
  );
};

export default GlobalLayout;
