import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export function Header() {
  const location = useLocation();
  const nav = useNavigate();

  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  if (hideHeader) return null;

  function logout() {
    localStorage.removeItem("token");
    nav("/login");
  }

  return (
    <header className="w-full h-16 bg-gray-900 border-b border-gray-700 fixed top-0 left-0 flex items-center px-6 z-50">
      <div className="flex-1 text-xl font-bold">CryptoTrack</div>

      <nav className="flex items-center gap-6 text-gray-300">
        <Link to="/dashboard" className="hover:text-white transition">
          Dashboard
        </Link>

        <Link to="/coins" className="hover:text-white transition">
          Coins
        </Link>

        <Button className="ml-4" onClick={logout}>
          Sair
        </Button>
      </nav>
    </header>
  );
}
