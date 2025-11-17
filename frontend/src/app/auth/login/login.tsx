import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await axios.post("http://localhost:4000/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    nav("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Entrar</h1>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={handleLogin}>Entrar</Button>

          <p
            className="text-blue-400 cursor-pointer text-sm"
            onClick={() => nav("/register")}
          >
            Criar conta
          </p>
        </div>
      </Card>
    </div>
  );
}
