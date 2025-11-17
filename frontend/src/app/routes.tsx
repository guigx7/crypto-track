import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/login/login";
import Register from "./auth/register/register";
import Dashboard from "./auth/dashboard/dashboard";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
