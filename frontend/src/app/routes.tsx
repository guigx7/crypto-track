import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/login/login";
import Register from "./auth/register/register";
import Dashboard from "./auth/dashboard/dashboard";
import CoinsList from "./coins/coins-list";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coins" element={<CoinsList />} />
      </Routes>
    </BrowserRouter>
  );
}
