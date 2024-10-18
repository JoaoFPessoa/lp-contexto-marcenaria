"use client";
import { FocusCards } from "./cards";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { useEffect, useState } from "react";
import { fetchAcabamentos } from "../../../../supabase";

export default function Acabamento() {
  const [cards, setCards] = useState([]);
  async function getData() {
    const data = await fetchAcabamentos();
    //@ts-ignore
    setCards(data);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex px-[10%]  flex-col items-center w-full py-28 ">
      <h1 className="text-3xl lg:text-6xl text-primary w-full items-center justify-center gap-3 flex">
        acabamentos
      </h1>
      <FocusCards cards={cards} />
    </div>
  );
}
