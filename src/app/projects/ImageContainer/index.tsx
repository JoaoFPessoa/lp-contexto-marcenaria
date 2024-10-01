// ImageContainer.tsx
import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
}

interface Props {
  img: ImageProps;
}

const ImageContainer = ({ img }: Props) => {
  return (
    <div className="gallery-item transform transition duration-500 hover:scale-105 cursor-pointer">
      <Image
        src={img.src}
        alt={img.alt}
        layout="responsive"
        width={1}
        height={1}
        className={`rounded-lg  object-cover`}
      />
    </div>
  );
};

export default ImageContainer;
