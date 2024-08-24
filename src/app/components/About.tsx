"use client";
import AboutTwo from "../../../public/about-two.jpg";
import LogoPreto from "../../../public/Logo-Preto.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import AnimatedLeftDiv from "./ui/LeftDiv";
import AnimatedRightDiv from "./ui/RightDiv";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null); // Create a RefObject

  return (
    <div className="px-[10%]  my-36 flex items-center text-center justify-between">
      <AnimatedLeftDiv ref={containerRef} className="w-1/2">
        <h1 className="black-underline-animation items-center flex text-primary leading-tight text-7xl">
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
      </AnimatedLeftDiv>

      <AnimatedRightDiv
        ref={containerRef}
        className="w-1/2  h-full flex items-center justify-center"
      >
        <Image src={AboutTwo} alt="" height={600} />
      </AnimatedRightDiv>
    </div>
  );
}
