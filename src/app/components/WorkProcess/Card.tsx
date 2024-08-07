export default function WorkProgressCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-12 w-full lg:w-[calc(33%-50px)] flex flex-col">
      <h1 className="text-4xl mb-8 text-white tracking-tight underline-animation">
        {title}
      </h1>
      <p className="text-xl text-white/70">{description}</p>
    </div>
  );
}
