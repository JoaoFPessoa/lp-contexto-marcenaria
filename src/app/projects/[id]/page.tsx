"use client";
import SkeletonGrid from "@/app/admin/components/skeletonGrid";
import { FocusCards } from "@/app/components/Acabamento/cards";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../../../supabase";

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
  const [loading, setLoading] = useState(true); // For handling loading state

  async function getProjectData() {
    try {
      // 1. Fetch project data from 'projects' table
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single(); // Assuming there's a single project with this ID

      if (projectError) {
        console.error("Error fetching project:", projectError);
        setLoading(false);
        return;
      }

      // 2. Fetch project images from 'project_images' table
      const { data: imagesData, error: imagesError } = await supabase
        .from("project_images")
        .select("image_url")
        .eq("project_id", id);

      if (imagesError) {
        console.error("Error fetching project images:", imagesError);
        setLoading(false);
        return;
      }

      // 3. Get the public URL for the main image and project images
      const mainImage = projectData.main_image
        ? supabase.storage
            .from("bucket-project-images")
            .getPublicUrl(projectData.main_image).data.publicUrl
        : "";

      const projectImages = imagesData.map((img: { image_url: string }) => ({
        src: supabase.storage
          .from("bucket-project-images")
          .getPublicUrl(img.image_url).data.publicUrl,
      }));

      // 4. Set the project data including the images
      setProject({
        id: projectData.id,
        title: projectData.title,
        description: projectData.description,
        mainImage,
        projectImages,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching project data:", error);
      setLoading(false);
    }
  }

  console.log({ project });
  useEffect(() => {
    getProjectData();
  }, [id]);

  if (loading) {
    return <SkeletonGrid />;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <Header />
      <section className="p-4 my-32 px-[10%]">
        <div className="flex flex-col lg:flex-row mt-36 lg:mt-0 mb-64 items-center h-[600px] w-full justify-between">
          <div className="">
            <h1 className="w-fit text-5xl font-bold mb-4 black-underline-animation transition-transform duration-300 ">
              {project.title}
            </h1>
            <p className="max-w-[400px] font-medium mb-6">
              {project.description}
            </p>
          </div>

          <div className="w-full lg:w-[50%] h-[90%]">
            <img
              src={project.mainImage}
              className="w-full h-full object-contain"
              alt="main-image"
              width={10000}
              height={10000}
              loading="lazy"
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
