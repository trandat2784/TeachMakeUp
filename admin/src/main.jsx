import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminContext from "./Context/AdminContext.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContext>
      <StrictMode>
        <App />
      </StrictMode>
    </AdminContext>
  </BrowserRouter>
);
