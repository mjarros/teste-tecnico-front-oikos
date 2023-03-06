import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import LoginInputs from "./components/LoginInputs/LoginInputs";
import AccessCode from "./components/AccessCode/AccessCode";
import Page404 from "./pages/Page404";
import UserDashboard from "./pages/UserDashboard/UserDashboard";

export function MyRoutes() {
  return (
    <Routes>
      <Route path='/' exact element={<Navigate to='/login' />} />

      <Route path='/login' element={<Login />}>
        <Route path='' element={<LoginInputs />} />
        <Route path='/login/codigo-acesso' element={<AccessCode />} />
      </Route>

      <Route path='/user-dashboard' element={<UserDashboard />} />

      <Route path='*' element={<Page404 />} />
    </Routes>
  );
}
