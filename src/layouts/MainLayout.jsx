import { Outlet } from "react-router-dom";

const MainLayout = () => {
  console.log("Main Layout component rendered");
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
