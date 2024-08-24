import Header from "./components/Header";
import Banner from "./components/Banner";
import Head from "next/head";
import About from "./components/About";
import WorkProgress from "./components/WorkProcess";
import Projects from "./components/Projects";
import MeetUs from "./components/MeetUs";
import Acabamento from "./components/Acabamento";

export default function Home() {
  return (
    <div className="bg-custom-gradient flex overflow-x-hidden flex-col items-center">
      <Header />
      <Banner />
      <About />
      <MeetUs />
      <WorkProgress />
      <Projects />
      <Acabamento />
    </div>
  );
}
