import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../public/Logo-Text-Branco.png";
import Whatsapp from "../../../../public/SocialMedia/whatsapp.svg";
import Youtube from "../../../../public/SocialMedia/youtube.svg";
import Instagram from "../../../../public/SocialMedia/instagram.svg";
import Mail from "../../../../public/SocialMedia/mail.svg";
import Pinterest from "../../../../public/SocialMedia/pinterest.svg";
import Tiktok from "../../../../public/SocialMedia/tiktok.svg";

export default function Footer() {
  return (
    <div
      className="relative h-[400px]  w-full  "
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed  h-[400px] w-full bottom-0">
        <div className="flex bg-[#D1B7A1] justify-between items-center  p-24 w-full h-full">
          <div className="w-1/4 border-r-2 border-white ">
            <nav className="flex w-fit text-lg flex-col gap-2  font-semibold text-white">
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
          <div className="w-3/4 flex items-center justify-center ">
            <Image src={Logo} className="w-[20%] " alt="logo" />
          </div>
          <div className="grid grid-cols-3  gap-4 w-1/6">
            <a target="_blank" href="https://wa.me/message/2AOLK4P6HY3ZI1">
              <Image
                width={35}
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
                width={35}
                className="cursor-pointer"
                src={Instagram}
                alt="Instagram"
              />
            </a>
            <a target="_blank" href="mailto:danila@contextomarcenaria.com.br">
              <Image
                width={35}
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
                width={35}
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
                width={35}
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
                width={35}
                className="cursor-pointer"
                src={Tiktok}
                alt="Tiktok"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
