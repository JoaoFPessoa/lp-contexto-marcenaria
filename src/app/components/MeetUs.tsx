"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import FirstEmployee from "../../../public/Employees/employee-one.jpg";
import SecondEmployee from "../../../public/Employees/employee-two.bmp";
import ThirdEmployee from "../../../public/Employees/employee-three.jpg";
import FourthEmployee from "../../../public/Employees/employee-four.jpg";
import FifthEmployee from "../../../public/Employees/employee-five.jpg";
import SixthEmployee from "../../../public/Employees/employee-six.jpg";
import { ArrowRightCircle, ArrowLeftCircle } from "lucide-react";

const employees = [
  {
    src: FirstEmployee,
    alt: "Nome1",
    title: "Title1",
    description: "Description1",
  },
  {
    src: SecondEmployee,
    alt: "Nome2",
    title: "Title2",
    description: "Description2",
  },
  {
    src: ThirdEmployee,
    alt: "Nome3",
    title: "Title3",
    description: "Description3",
  },
  {
    src: FourthEmployee,
    alt: "Nome4",
    title: "Title4",
    description: "Description4",
  },
  {
    src: FifthEmployee,
    alt: "Nome5",
    title: "Title5",
    description: "Description5",
  },
  {
    src: SixthEmployee,
    alt: "Nome6",
    title: "Title6",
    description: "Description6",
  },
];

export default function MeetUs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === employees.length - 3 ? 0 : prevIndex + 1
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
      prevIndex === employees.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? employees.length - 3 : prevIndex - 1
    );
  };

  return (
    <div className="my-36 w-full max-w-screen-2xl">
      <h1 className="text-7xl px-[10%]">Conheça nosso time</h1>
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
          className="flex w-full gap-8 transition-transform duration-500"
          style={{ transform: `translateX(-${(currentIndex * 100) / 3}%)` }}
        >
          {employees.map((employee, index) => (
            <div
              key={index}
              className={`w-1/3 flex-shrink-0 overflow-hidden ${
                index !== currentIndex + 1 ? "brightness-50" : ""
              }`}
            >
              <div className="w-full h-[500px] relative">
                <Image
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-125 "
                  src={employee.src}
                  alt={employee.alt}
                  layout="fill"
                />
                <div className="p-4 text-white bottom-0 w-full h-[30%] absolute z-50  text-center">
                  <div className="absolute inset-0 bg-black -z-10 opacity-20"></div>
                  <h2 className="text-3xl font-bold">{employee.title}</h2>
                  <p className="text-white/80">{employee.description}</p>
                </div>
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
