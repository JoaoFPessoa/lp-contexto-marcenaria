"use client";
// ImageContainer.tsx
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ImageProps {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  projectImages: string[];
}

interface Props {
  img: ImageProps;
}

const ImageContainer = ({ img }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    console.log("caiu no handle");
    router.push(`/projects/${img.id}`);
  };
  return (
    <div
      onClick={handleClick}
      className="relative overflow-hidden max-w-[600px]  group cursor-pointer"
    >
      {" "}
      {/* Make the container relative for absolute positioning */}
      <Image
        src={img.src}
        alt={img.alt}
        layout="responsive"
        width={1}
        height={1}
        className=" rounded-lg    object-cover transition duration-300 ease-in-out group-hover:grayscale" // Add transition and grayscale effect on hover
      />
      <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
        {" "}
        {/* Center the title */}
        <h2 className="text-lg font-bold">{img.title}</h2>
      </div>
    </div>
  );
};

export default ImageContainer;
