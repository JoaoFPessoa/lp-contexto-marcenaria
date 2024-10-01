import Footer from "../components/Footer";
import Header from "../components/Header";
import ImageContainer from "./ImageContainer";

const images = [
  {
    src: "https://picsum.photos/seed/1/400/600",
    alt: "Random Image 1",
  },
  {
    src: "https://picsum.photos/seed/2/500/700",
    alt: "Random Image 2",
  },
  {
    src: "https://picsum.photos/seed/3/600/800",
    alt: "Random Image 3",
  },
  {
    src: "https://picsum.photos/seed/4/450/650",
    alt: "Random Image 4",
  },
  {
    src: "https://picsum.photos/seed/5/550/750",
    alt: "Random Image 5",
  },
  {
    src: "https://picsum.photos/seed/6/500/600",
    alt: "Random Image 6",
  },
  {
    src: "https://picsum.photos/seed/7/700/900",
    alt: "Random Image 7",
  },
  {
    src: "https://picsum.photos/seed/8/400/500",
    alt: "Random Image 8",
  },
];

export default function Projects() {
  return (
    <div className="bg-custom-gradient min-h-[100vh] flex overflow-x-hidden flex-col items-center">
      <Header />
      <h1 className=" text-center text-2xl font-bold mt-32 w-full">
        nossos projetos.
      </h1>

      <div className="gallery-grid w-full my-36">
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
