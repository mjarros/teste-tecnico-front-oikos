import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { MyRoutes } from "./routes";
import { StoresProvider } from "./stores";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoresProvider>
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </StoresProvider>
  </React.StrictMode>
);
