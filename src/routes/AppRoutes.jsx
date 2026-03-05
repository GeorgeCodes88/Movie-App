import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { MovieDetails } from "../components/MovieDetails";
import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="movie/:id" element={<MovieDetails />} />
      </Route>
      <Route
        path="*"
        element={<div className="text-white">404 - Not Found</div>}
      />
    </Routes>
  );
}
