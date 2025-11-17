import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/login/login";
import Register from "./auth/register/register";
import CoinsList from "./coins/coins-list";
import CoinDetails from "./coins/coin-details";
import Favorites from "./favorites/favorites";
import { AppLayout } from "../components/layout/app-layout";
import Dashboard from "./dashboard/dashboard";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />

        <Route
          path="/coins"
          element={
            <AppLayout>
              <CoinsList />
            </AppLayout>
          }
        />

        <Route
          path="/coins/:id"
          element={
            <AppLayout>
              <CoinDetails />
            </AppLayout>
          }
        />

        <Route
          path="/favorites"
          element={
            <AppLayout>
              <Favorites />
            </AppLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
