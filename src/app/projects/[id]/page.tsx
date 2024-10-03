"use client";
// pages/project/[id].tsx
import { FocusCards } from "@/app/components/Acabamento/cards";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProjectData {
  id: string;
  title: string;
  description: string;
  projectImages: { src: string }[];
  mainImage: string;
}

const ProjectDetails = () => {
  const params = useParams();
  const id = params.id;

  const [project, setProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProjectData = async () => {
        const mockData: ProjectData = {
          id: id as string,
          title: "Sample Project Title",
          mainImage: "https://picsum.photos/id/237/200/300",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          projectImages: [
            { src: "https://picsum.photos/seed/1/400/100" },
            { src: "https://picsum.photos/seed/1/400/200" },
            { src: "https://picsum.photos/seed/1/400/300" },
            { src: "https://picsum.photos/seed/1/400/400" },
            { src: "https://picsum.photos/seed/1/400/600" },
            { src: "https://picsum.photos/seed/8/400/500" },
            { src: "https://picsum.photos/seed/1/400/700" },
            { src: "https://picsum.photos/seed/1/400/800" },
            { src: "https://picsum.photos/seed/1/400/900" },
          ],
        };
        setProject(mockData);
      };
      fetchProjectData();
    }
  }, [id]);

  if (!project) {
    return <div>Carregando</div>;
  }

  return (
    <div>
      <Header />
      <section className="p-4 my-32">
        <div className="flex mb-64 items-center  h-[600px] w-full justify-between">
          <div className="">
            <h1 className="w-fit text-5xl font-bold mb-4 black-underline-animation transition-transform duration-300 ">
              {project.title}
            </h1>
            <p className="max-w-[400px] font-medium mb-6">
              {project.description}
            </p>
          </div>

          <div className="w-[50%]">
            <Image
              src={"/Projects/kitchen-lp.jpg"}
              className="w-full h-full object-contain"
              alt="main-image"
              width={10000}
              height={10000}
            />
          </div>
        </div>

        <FocusCards cards={project.projectImages} />
      </section>
      <Footer />
    </div>
  );
};

export default ProjectDetails;
