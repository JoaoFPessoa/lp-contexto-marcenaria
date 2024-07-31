import Head from "next/head";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Header />
    </div>
  );
}
