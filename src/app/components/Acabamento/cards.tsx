"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/utils/cn";

type CardType = {
  id?: number;
  public_url?: string;
  src?: string;
};

export const Card = ({
  card,
  index,
  hovered,
  setHovered,
}: {
  card: CardType;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}) => (
  <div
    key={card.id}
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={cn(
      "rounded-lg relative bg-gray-100  overflow-hidden h-60 md:h-[650px] w-full transition-all duration-300 ease-out",
      hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
    )}
  >
    <img
      src={card.src ?? card.public_url}
      alt={String(card.id)}
      className="object-cover absolute w-full h-full inset-0"
    />
  </div>
);

export function FocusCards({ cards }: { cards: CardType[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-12  w-full">
      {cards.map((card, index) => (
        <Card
          key={card.src ?? card.public_url}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
