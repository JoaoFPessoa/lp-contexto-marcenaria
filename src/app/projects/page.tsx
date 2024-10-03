"use client";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ImageContainer from "./ImageContainer";

const images = [
  {
    src: "https://picsum.photos/seed/1/400/600",
    alt: "Random Image 1",
    title: "Title Test",
    id: "1",
    projectImages: [
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
    ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    src: "https://picsum.photos/seed/2/500/700",
    alt: "Random Image 2",
    title: "Title Test",
    id: "1",
    projectImages: [
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
    ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    src: "https://picsum.photos/seed/3/600/800",
    alt: "Random Image 3",
    title: "Title Test",
    id: "1",
    projectImages: [
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
    ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    src: "https://picsum.photos/seed/4/450/650",
    alt: "Random Image 4",
    title: "Title Test",
    id: "1",
    projectImages: [
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
    ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    src: "https://picsum.photos/seed/5/550/750",
    alt: "Random Image 5",
    title: "Title Test",
    id: "1",
    projectImages: [
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
    ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    src: "https://picsum.photos/seed/6/500/600",
    alt: "Random Image 6",
    title: "Title Test",
    id: "1",
    projectImages: [
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
    ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    src: "https://picsum.photos/seed/7/700/900",
    alt: "Random Image 7",
    title: "Title Test",
    id: "1",
    projectImages: [
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
    ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    src: "https://picsum.photos/seed/8/400/500",
    alt: "Random Image 8",
    title: "Title Test",
    id: "1",
    projectImages: [
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/1/400/600",
    ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

export default function Projects() {
  return (
    <div className="bg-custom-gradient min-h-[100vh] flex overflow-x-hidden flex-col items-center">
      <Header />
      <h1 className=" text-center text-4xl font-bold my-32 w-full">
        nossos projetos
      </h1>

      <div className="gallery-grid w-full mb-32">
        {images.map((img, index) => {
          const columnSpan = Math.floor(Math.random() * 5) + 1;

          return (
            <div
              key={index}
              className="gallery-item"
              //@ts-expect-error clas
              style={{ "--column": columnSpan }}
            >
              <ImageContainer img={img} />
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
