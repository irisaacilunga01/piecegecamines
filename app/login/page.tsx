"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Redirige l'utilisateur après une connexion réussie
      toast({
        title: "Authentification réussie",
        description: "Vous êtes maintenant connecté.",
        className: "bg-green-700",
      });
      window.location.href = "/dashboard/piece";
    } else {
      const data = await response.json();
      setError(data.error);
      toast({
        title: "Échec de l'authentification",
        description: error || "Veuillez vérifier vos informations.",
        className: "bg-red-700",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex justify-center items-center h-screen w-full"
    >
      <Card className="mx-auto max-w-sm py-4 pb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Se connecter</CardTitle>
          <CardDescription>
            Entrez votre email et votre mot de pass pour vous connecter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </div>

          {error && (
            <div className="bg-red-700 rounded-lg py-4 text-center">
              {error}
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  );
}
