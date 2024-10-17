"use client";
import AboutTwo from "../../../public/about-two.jpg";
import LogoPreto from "../../../public/Logo-Preto.png";
import LogoTextoPreto from "../../../public/Logo-Texto-Preto.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import AnimatedLeftDiv from "./ui/LeftDiv";
import AnimatedRightDiv from "./ui/RightDiv";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null); // Create a RefObject

  return (
    <div className="px-[5%] gap-12 my-36 flex  items-center justify-between">
      <AnimatedLeftDiv ref={containerRef} className="w-1/3">
        <div className="flex  justify-between items-center">
          <h1 className="black-underline-animation font-semibold text-primary leading-tight text-5xl">
            CONTEXTO
          </h1>
          <h3 className="text-3xl font-light ">MARCENARIA</h3>
        </div>
        <p className="text-primary/75 text-justify text-2xl mt-4">
          nossa proposta enquanto marcenaria é materializar projetos de forma
          minuciosa e refinada, através da compatibilização e alinhamento entre
          desenho e execução. Buscar soluções personalizadas com a utilização de
          tecnologia e conhecimento técnico de processos artesanais. Acreditamos
          que a coletividade, o elo entre projeto e execução e o toque humano
          são essenciais.
          {/* Idealizada em 2000 por Gerson Wiebbeling, marceneiro autodidata que
          sempre esteve em contato com o ofício de sua família à gerações. No
          início sozinho ou com poucos ajudantes, trabalhou em um espaço pequeno
          por alguns anos. Com o crescimento e a necessidade de expansão, em
          2012 muda-se para um local próprio no mesmo bairro onde tudo começou
          em São Paulo. A Contexto ao longo dos vinte e quatro anos realizou
          diversos projetos e atualmente seus filhos Guilherme e Danila
          trabalham ao lado do pai na marcenaria. */}
        </p>
      </AnimatedLeftDiv>

      <AnimatedRightDiv
        ref={containerRef}
        className="w-1/2   flex  items-center justify-center"
      >
        <Image src={AboutTwo} alt="" className="h-[600px] object-cover" />
      </AnimatedRightDiv>
    </div>
  );
}
