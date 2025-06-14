import { Outlet } from "react-router";
import Header from "./Header";

const RootLayout = () => {
  return (
    <div className="bg-gray-50 h-screen">
      <Header />
      <div className="p-4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
