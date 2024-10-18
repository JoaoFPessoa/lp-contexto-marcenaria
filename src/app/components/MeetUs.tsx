"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRightCircle, ArrowLeftCircle } from "lucide-react";
import { fetchDailys } from "../../../supabase";

type Daily = {
  public_url: string;
  sort_order: number;
  id: string;
  isVideo: boolean;
};

export default function MeetUs() {
  const [dailys, setDailys] = useState<Daily[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  async function getData() {
    const response = await fetchDailys();
    //@ts-ignore
    setDailys(response);
  }

  useEffect(() => {
    getData();
  }, []);

  const startSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === dailys.length - 3 ? 0 : prevIndex + 1
      );
    }, 2000);
  };

  const stopSlide = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // Clear the ref after stopping the interval
    }
  };

  useEffect(() => {
    startSlide();
    return () => stopSlide();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === dailys.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dailys.length - 3 : prevIndex - 1
    );
  };

  return (
    <div className="my-36 w-full max-w-screen-2xl">
      <h1 className="text-6xl">dia a dia</h1>
      <div
        ref={sliderRef}
        className="relative mt-8 flex gap-4 overflow-hidden"
        onMouseEnter={stopSlide}
        onMouseLeave={startSlide}
      >
        <ArrowLeftCircle
          onClick={prevSlide}
          className="absolute top-[45%] cursor-pointer left-2 z-10 text-white"
        >
          Prev
        </ArrowLeftCircle>
        <div
          className=" flex w-full gap-8 transition-transform duration-1000"
          style={{ transform: `translateX(-${(currentIndex * 100) / 3}%)` }}
        >
          {dailys.map((daily, index) => (
            <div
              key={index}
              className={`w-1/3 flex-shrink-0 overflow-hidden ${
                index !== currentIndex + 1 ? "brightness-[0.75]" : ""
              }`}
            >
              <div className="w-full h-[500px] relative">
                {daily.isVideo ? (
                  <video
                    src={daily.public_url}
                    autoPlay
                    controls={false}
                    loop
                    muted // Add muted if you want it to autoplay without sound
                    className="w-full h-full object-cover mb-4 rounded-lg"
                  />
                ) : (
                  <img
                    src={daily.public_url}
                    alt={daily.id}
                    className="w-full h-full object-cover mb-4 rounded-lg"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <ArrowRightCircle
          onClick={nextSlide}
          className="absolute top-[45%] cursor-pointer right-2 z-10 text-white"
        >
          Next
        </ArrowRightCircle>
      </div>
    </div>
  );
}
