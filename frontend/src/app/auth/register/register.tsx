import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    await axios.post("http://localhost:4000/auth/register", {
      email,
      password,
    });

    nav("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-white">Criar Conta</h1>

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

          <Button onClick={handleRegister}>Criar conta</Button>

          <p
            className="text-blue-400 cursor-pointer text-sm"
            onClick={() => nav("/login")}
          >
            Já tenho conta
          </p>
        </div>
      </Card>
    </div>
  );
}
