import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
