import Image from "next/image";
import Logo from "../../../static/Logo-Preto.png";
import Link from "next/link";

export default function Header() {
  return (
    <div className="absolute  top-0 w-full flex justify-between items-center max-w-screen-2xl  bg-transparent  border border-black">
      <Image src={Logo} width={100} alt="contexto-logo" />

      <nav className="flex gap-4 text-xl">
        <Link
          className="transition-transform duration-300 hover:scale-110"
          href="/"
        >
          Início
        </Link>
        <Link
          className="transition-transform duration-300 hover:scale-110"
          href="/projects"
        >
          Projetos
        </Link>
        <Link
          className="transition-transform duration-300 hover:scale-110"
          href="/about"
        >
          Sobre
        </Link>
        <Link
          className="transition-transform duration-300 hover:scale-110"
          href="/"
        >
          Arquitetos
        </Link>
      </nav>
    </div>
  );
}
