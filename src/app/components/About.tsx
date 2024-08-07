import Image from "next/image";
import AboutTwo from "../../../public/About/about-two.jpg";
import LogoPreto from "../../../public/Logo-Preto.png";

export default function About() {
  return (
    <div className="px-[10%] my-36 flex items-center text-center justify-between">
      <div className="w-1/2">
        <h1 className="underline-animation items-center flex text-primary leading-tight text-7xl">
          Contexto Marcenaria
          <Image
            src={LogoPreto}
            className="ml-4 w-[60px] h-[60px]"
            alt="logo"
          />
        </h1>
        <p className="text-primary/75 text-center text-2xl mt-4">
          Nossa proposta enquanto marcenaria é materializar projetos de forma
          minuciosa e refinada, através da compatibilização e alinhamento entre
          desenho e execução. Buscar soluções personalizadas com a utilização de
          tecnologia e conhecimento técnico de processos artesanais. Acreditamos
          que a coletividade, o elo entre projeto e execução e o toque humano
          são essenciais.
        </p>
      </div>
      <Image
        src={AboutTwo}
        alt=""
        height={300}
        loading="lazy"
        className="w-1/4"
      />
    </div>
  );
}
