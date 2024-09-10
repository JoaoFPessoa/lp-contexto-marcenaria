import Image from "next/image";
import Logo from "../../../public/Header/Logo-Branco.png";
import Link from "next/link";

export default function Header() {
  return (
    <div className="absolute top-0 w-full flex justify-between items-center px-[10%] bg-transparent  ">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <Link href={"/"}>
        <Image src={Logo} width={80} alt="contexto-logo" />
      </Link>

      <nav className="flex gap-24 text-xl  font-semibold text-white">
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
