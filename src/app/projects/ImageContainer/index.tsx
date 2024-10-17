"use client";
// ImageContainer.tsx
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Project } from "../page";

interface Props {
  project: Project;
}

const ImageContainer = ({ project }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/projects/${project.id}`);
  };
  return (
    <div
      onClick={handleClick}
      className="relative overflow-hidden max-w-[600px]  group cursor-pointer"
    >
      {" "}
      {/* Make the container relative for absolute positioning */}
      {project.main_image && (
        <img
          src={project.main_image}
          alt={project.title}
          width={1}
          height={1}
          loading="lazy" // Lazy load the image
          className=" rounded-lg  w-[300px] h-[300px]   object-cover transition duration-300 ease-in-out group-hover:grayscale" // Add transition and grayscale effect on hover
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
        {" "}
        {/* Center the title */}
        <h2 className="text-lg font-bold">{project.title}</h2>
      </div>
    </div>
  );
};

export default ImageContainer;
