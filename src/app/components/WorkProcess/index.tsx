import WorkProgressCard from "./Card";

export default function WorkProgress() {
  return (
    <div className="flex flex-col px-[10%] py-28 bg-slate-950">
      <h1 className="text-white text-7xl mb-16">Processo de trabalho</h1>
      <div className="flex-col lg:flex-row flex flex-wrap justify-between gap-12">
        <WorkProgressCard
          title={"Contato"}
          description="será um prazer participar da realização
do seu sonho!
nesta etapa vamos entender suas
necessidades e desejos.
"
        />
        <WorkProgressCard
          title={"Projeto"}
          description="nós trabalhamos com projetos de
arquitetos e designers, mas também
executamos projetos próprios.
caso não tenha, nós enviaremos uma
prévia de orçamento baseado em
medidas, referências e materiais.
projetos próprios e executivos são
desenvolvidos após a aprovação da
proposta.
"
        />
        <WorkProgressCard
          title={"Proposta"}
          description="neste etapa nós assinamos contrato,
efetuamos pagamento e daremos
início na produção.
o prazo será definido em acordo com
a produção e cliente.
nesta etapa os projetos são iniciados.

"
        />
        <WorkProgressCard
          title={"Medição"}
          description="para iniciarmos a produção da sua
marcenaria, precisamos confirmar todos
os detalhes do projeto e a medida para
execução na obra.

"
        />
        <WorkProgressCard
          title={"Produção"}
          description="nesta etapa nós estamos preparando seu
projeto. trocas de informações e dúvidas
podem aparecer. teremos contato direto
para tudo ser alinhado.

"
        />
        <WorkProgressCard
          title={"Instalação | Finalização"}
          description="nesta etapa nós estamos preparando seu
projeto. trocas de informações e dúvidas
podem aparecer. teremos contato direto
para tudo ser alinhado.
"
        />
      </div>
    </div>
  );
}
