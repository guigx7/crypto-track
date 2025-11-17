
import { useNavigate } from "react-router-dom";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

export default function Dashboard() {
  const nav = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    nav("/login");
  }

  return (
    <div className="min-h-screen p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <Card>
        <p>Você está autenticado.</p>
      </Card>

      <Button className="mt-6" onClick={logout}>
        Sair
      </Button>
    </div>
  );
}
