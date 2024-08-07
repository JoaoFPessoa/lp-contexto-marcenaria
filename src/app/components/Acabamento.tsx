import Image from "next/image";
import AcabamentoUm from "../../../public/Acabamento/acabamento-1.jpg";
import AcabamentoDois from "../../../public/Acabamento/acabamento-2.jpg";
import AcabamentoTres from "../../../public/Acabamento/acabamento-3.jpg";
import AcabamentoQuatro from "../../../public/Acabamento/acabamento-4.jpg";
import AcabamentoCinco from "../../../public/Acabamento/acabamento-5.jpg";
import AcabamentoSeis from "../../../public/Acabamento/acabamento-6.jpg";
import AcabamentoSete from "../../../public/Acabamento/acabamento-7.jpg";
import AcabamentoOito from "../../../public/Acabamento/acabamento-8.jpg";

export default function Acabamento() {
  return (
    <div className="flex flex-col items-center w-full py-36 bg-slate-950">
      <h1 className="underline-animation text-7xl max-w-screen-2xl text-white w-full text-left">
        Acabamentos
      </h1>
      <div className=" list-effect flex scrollbar overflow-x-scroll items-center justify-center gap-5 transition-all duration-100">
        {
          <Image
            className="item-effect h-[400px] w-[250px] transition-all duration-300"
            alt="acabamento"
            src={AcabamentoUm}
          />
        }

        {
          <Image
            className="item-effect h-[400px] w-[250px] transition-all duration-300"
            alt="acabamento"
            src={AcabamentoDois}
          />
        }

        {
          <Image
            className="item-effect h-[400px] w-[250px] transition-all duration-300"
            alt="acabamento"
            src={AcabamentoTres}
          />
        }

        {
          <Image
            className="item-effect h-[400px] w-[250px] transition-all duration-300"
            alt="acabamento"
            src={AcabamentoQuatro}
          />
        }

        {
          <Image
            className="item-effect h-[400px] w-[250px] transition-all duration-300"
            alt="acabamento"
            src={AcabamentoCinco}
          />
        }

        {
          <Image
            className="item-effect h-[400px] w-[250px] transition-all duration-300"
            alt="acabamento"
            src={AcabamentoSeis}
          />
        }

        {
          <Image
            className="item-effect h-[400px] w-[250px] transition-all duration-300"
            alt="acabamento"
            src={AcabamentoSete}
          />
        }

        {
          <Image
            className="item-effect h-[400px] w-[250px] transition-all duration-300"
            alt="acabamento"
            src={AcabamentoOito}
          />
        }
      </div>
    </div>
  );
}
