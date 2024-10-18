"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../public/Logo-Text-Branco.png";
import Whatsapp from "../../../../public/SocialMedia/whatsapp.svg";
import Youtube from "../../../../public/SocialMedia/youtube.svg";
import Instagram from "../../../../public/SocialMedia/instagram.svg";
import Mail from "../../../../public/SocialMedia/mail.svg";
import Pinterest from "../../../../public/SocialMedia/pinterest.svg";
import Tiktok from "../../../../public/SocialMedia/tiktok.svg";
import { useState, useEffect } from "react";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Function to update the `isMobile` state based on the screen width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Assuming 768px as the mobile breakpoint
    };

    // Add event listener to monitor window resize
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className="relative h-[400px]  w-full  "
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed    h-[400px] w-full bottom-0">
        <div className="flex bg-[#D1B7A1] justify-between items-center  p-8 lg:p-24 w-full h-full">
          <div className="w-1/2 lg:w-1/4 border-r-2 border-white ">
            <nav className="flex w-full px-4 lg:w-fit text-lg flex-col gap-2  font-semibold text-white">
              <Link
                className="black-underline-animation transition-transform duration-300 hover:scale-110"
                href="/"
              >
                início
              </Link>
              <Link
                className="black-underline-animation transition-transform duration-300 hover:scale-110"
                href="/projects"
              >
                projetos
              </Link>
              <Link
                className="black-underline-animation transition-transform duration-300 hover:scale-110"
                href="/about"
              >
                sobre
              </Link>
              <Link
                className="black-underline-animation transition-transform duration-300 hover:scale-110"
                href="/"
              >
                arquitetos
              </Link>
            </nav>
          </div>
          <div className="flex  h-full items-center justify-center px-6 lg:w-full flex-col lg:flex-row">
            <div className=" flex flex-col lg:flex-row   items-center justify-center ">
              <Image src={Logo} className=" lg:w-[20%] " alt="logo" />
            </div>
            <div className="grid grid-cols-3 w-full my-4 gap-4 lg:w-1/6">
              <a target="_blank" href="https://wa.me/message/2AOLK4P6HY3ZI1">
                <Image
                  width={isMobile ? 20 : 35}
                  className="cursor-pointer"
                  src={Whatsapp}
                  alt="whatsapp"
                />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/contextomarcenaria/"
              >
                <Image
                  width={isMobile ? 20 : 35}
                  className="cursor-pointer"
                  src={Instagram}
                  alt="Instagram"
                />
              </a>
              <a target="_blank" href="mailto:danila@contextomarcenaria.com.br">
                <Image
                  width={isMobile ? 20 : 35}
                  className="cursor-pointer"
                  src={Mail}
                  alt="Mail"
                />
              </a>
              <a
                target="_blank"
                href="https://www.youtube.com/@contextomarcenaria"
              >
                <Image
                  width={isMobile ? 20 : 35}
                  className="cursor-pointer"
                  src={Youtube}
                  alt="Youtube"
                />
              </a>
              <a
                target="_blank"
                href="https://br.pinterest.com/contexto_marcenaria/"
              >
                <Image
                  width={isMobile ? 20 : 35}
                  className="cursor-pointer"
                  src={Pinterest}
                  alt="Pinterest"
                />
              </a>
              <a
                target="_blank"
                href="https://www.tiktok.com/@contextomarcenaria?_t=8cchhoq0mpv&_r=1"
              >
                <Image
                  width={isMobile ? 20 : 35}
                  className="cursor-pointer"
                  src={Tiktok}
                  alt="Tiktok"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
