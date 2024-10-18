import Image from "next/image";
import Logo from "../../../public/Header/Logo-Branco.png";
import BlackLogo from "../../../public/Logo-Preto.png";
import Link from "next/link";
import { cn } from "@/utils/cn";

export default function Header({ isHomePage }: { isHomePage?: boolean }) {
  return (
    <div className="absolute z-10 top-0 w-full flex justify-between items-center px-[4%] text-center lg:text-left lg:px-[10%] bg-transparent  ">
      <div
        className={cn(
          `absolute inset-0" ${isHomePage && "bg-black opacity-30`"}`
        )}
      ></div>
      <Link href={"/"}>
        <Image
          src={isHomePage ? Logo : BlackLogo}
          width={70}
          className={cn("w-[60px]", !isHomePage && "pt-2")}
          alt="contexto-logo"
        />
      </Link>

      <nav
        className={cn(
          `flex flex-col lg:flex-row p-4 lg:p-0 gap-4 lg:gap-24 text-2xl font-light text-black ${
            isHomePage && "text-white"
          }`
        )}
      >
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
  );
}
