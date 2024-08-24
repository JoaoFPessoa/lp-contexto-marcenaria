"use client";
import Image from "next/image";
import { FocusCards } from "./cards";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const cards = [
  {
    src: "/Acabamento/acabamento-1.jpg",
    title: "Título 1",
  },
  {
    src: "/Acabamento/acabamento-2.jpg",
    title: "Título 2",
  },
  {
    src: "/Acabamento/acabamento-3.jpg",
    title: "Título 3",
  },
  {
    src: "/Acabamento/acabamento-4.jpg",
    title: "Título 4",
  },
  {
    src: "/Acabamento/acabamento-5.jpg",
    title: "Título 5",
  },
  {
    src: "/Acabamento/acabamento-6.jpg",
    title: "Título 6",
  },
];

const effectWord = `a c a b a m e n t o s`;

export default function Acabamento() {
  return (
    <div className="flex max-w-screen-2xl flex-col items-center w-full py-28 ">
      <h1 className="text-6xl text-primary w-full items-center justify-center gap-3 flex">
        <TextGenerateEffect words={effectWord} />
      </h1>
      <FocusCards cards={cards} />
    </div>
  );
}
