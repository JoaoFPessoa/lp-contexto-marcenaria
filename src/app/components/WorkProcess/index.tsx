"use client";
import WorkProgressCard from "./Card";

export default function WorkProgress() {
  const cards = [
    {
      title: "Contato",
      description:
        "será um prazer participar da realização do seu sonho! nesta etapa vamos entender suas necessidades e desejos.",
    },
    {
      title: "Projeto",
      description:
        "nós trabalhamos com projetos de arquitetos e designers, mas também executamos projetos próprios...",
    },
    {
      title: "Proposta",
      description:
        "neste etapa nós assinamos contrato, efetuamos pagamento e daremos início na produção...",
    },
    {
      title: "Medição",
      description:
        "para iniciarmos a produção da sua marcenaria, precisamos confirmar todos os detalhes...",
    },
    {
      title: "Produção",
      description:
        "nesta etapa nós estamos preparando seu projeto. trocas de informações e dúvidas podem aparecer...",
    },
    {
      title: "Instalação | Finalização",
      description:
        "nesta etapa nós estamos preparando seu projeto. trocas de informações e dúvidas podem aparecer...",
    },
  ];

  return (
    <div className="flex flex-col  w-full max-w-screen-2xl  items-stretch  p-28">
      <h1 className="text-primary text-7xl mb-16">Processo de trabalho</h1>
      <div className="flex flex-col w-full justify-between items-stretch">
        {cards.map((card, idx) => (
          <WorkProgressCard
            key={idx}
            index={(idx + 1).toString().padStart(2, "0")} // Create an index like "01", "02"
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
}
