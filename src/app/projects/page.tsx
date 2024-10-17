"use client";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ImageContainer from "./ImageContainer";
import { listProjects, supabase } from "../../../supabase";
import SkeletonGrid from "../admin/components/skeletonGrid";

type ProjectImage = {
  image_url: string;
  sort_order: number; // Add sort_order for images
};

export type Project = {
  id: string;
  title: string;
  description: string;
  main_image: string; // This will be the public URL of the main image
  images: ProjectImage[];
  sort_order: number;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const projectData = await listProjects();
      setProjects(projectData || []);
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="bg-custom-gradient min-h-[100vh] flex overflow-x-hidden flex-col items-center">
      <Header />
      <h1 className="text-center text-4xl font-bold my-32 w-full">
        nossos projetos
      </h1>

      {loading ? (
        <SkeletonGrid />
      ) : (
        <div className="gallery-grid w-full mb-32">
          {projects.map((project, index) => {
            const columnSpan = Math.floor(Math.random() * 5) + 1;

            return (
              <div
                key={index}
                className="gallery-item"
                //@ts-expect-error clas
                style={{ "--column": columnSpan }}
              >
                <ImageContainer project={project} />
              </div>
            );
          })}
        </div>
      )}

      <Footer />
    </div>
  );
}
