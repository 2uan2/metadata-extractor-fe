import { Outlet } from "react-router";
import Header from "./Header";

const RootLayout = () => {
  return (
    <div className="">
      <Header />
      <div className="p-4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
