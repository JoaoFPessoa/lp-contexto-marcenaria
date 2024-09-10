export default function Projects() {
  return (
    <div className="relative h-[800px] w-full">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="parallax bg-[url('/Projects/kitchen-lp.jpg')] h-full w-full"></div>
      <div className="absolute inset-0 flex items-center  justify-center">
        <div className="text-white p-8 rounded shadow-lg text-center">
          <h1 className="text-3xl  mb-4">projetos</h1>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            veja mais
          </button>
        </div>
      </div>
    </div>
  );
}
