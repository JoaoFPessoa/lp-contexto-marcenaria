/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import AddProject from "./components/addProject";
import { deleteProject, supabase } from "../../../supabase";
import EditProjectModal from "./components/editProjectModal";
import { Toaster } from "react-hot-toast";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Projects from "../projects/page";
import ProjectPage from "./components/Project";
import AcabamentosPage from "./components/Acabamento";
import DailyPage from "./components/Daily";

type Page = "projetos" | "acabamentos" | "dia-a-dia";

export default function AdminPainel() {
  const [page, setPage] = useState<Page>("projetos");

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Toaster />

      <header className="border-b-2 flex justify-between items-center pb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>

        <div className="flex gap-2">
          <button
            className="p-2 bg-blue-950 text-white rounded-lg"
            onClick={() => setPage("projetos")}
          >
            Projetos
          </button>
          <button
            className="p-2 bg-blue-950 text-white rounded-lg"
            onClick={() => setPage("acabamentos")}
          >
            Acabamentos
          </button>
          <button
            className="p-2 bg-blue-950 text-white rounded-lg"
            onClick={() => setPage("dia-a-dia")}
          >
            Dia-a-dia
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
