/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, FormEvent } from "react";
import { Toaster } from "react-hot-toast";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AcabamentosPage from "./components/Acabamento";
import DailyPage from "./components/Daily";
import { useRouter } from "next/navigation";
import ProjectPage from "./components/Project";

type Page = "projetos" | "acabamentos" | "dia-a-dia";

export default function AdminPainel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [page, setPage] = useState<Page>("projetos");

  useEffect(() => {
    // Check if user is already logged in
    const auth = localStorage.getItem("auth");
    if (auth === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Validate credentials
    if (
      username === process.env.NEXT_PUBLIC_LOGIN &&
      password === process.env.NEXT_PUBLIC_PASS
    ) {
      // Save login state to localStorage
      localStorage.setItem("auth", "true");
      setIsLoggedIn(true);
    } else {
      setLoginError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsLoggedIn(false);
    router.push("/");
  };

  if (!isLoggedIn) {
    return (
      <div className="w-full  h-[100vh] flex items-center justify-center">
        <form
          className="flex p-12 flex-col items-center justify-between gap-4 border  rounded-lg"
          onSubmit={handleLogin}
        >
          <h1>Admin Login</h1>

          <input
            className="p-2 rounded-md border"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="p-2 rounded-md border"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-950 p-2 rounded-md w-full text-white"
            type="submit"
          >
            Login
          </button>
        </form>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Toaster />

      <header className="border-b-2 flex justify-between items-center pb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>

        <div className="flex gap-2">
          <button
            className="p-2 bg-blue-950 hover:bg-blue-900 text-white rounded-lg"
            onClick={() => setPage("projetos")}
          >
            Projetos
          </button>
          <button
            className="p-2 bg-blue-950 hover:bg-blue-900 text-white rounded-lg"
            onClick={() => setPage("acabamentos")}
          >
            Acabamentos
          </button>
          <button
            className="p-2 bg-blue-950 hover:bg-blue-900 text-white rounded-lg"
            onClick={() => setPage("dia-a-dia")}
          >
            Dia-a-dia
          </button>
          <button
            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </header>

      <section className="mt-6">
        {page === "projetos" && <ProjectPage />}
        {page === "acabamentos" && <AcabamentosPage />}
        {page === "dia-a-dia" && <DailyPage />}
      </section>
    </div>
  );
}
