import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { SearchProvider } from "./context/SearchContext";

const App = () => {
  console.log("App component rendered");
  return (
    <SearchProvider>
      <AppRoutes />
    </SearchProvider>
  );
};

export default App;
