import Header from "./components/Header";
import Banner from "./components/Banner";
import About from "./components/About";
import Projects from "./components/Projects";
import MeetUs from "./components/MeetUs";
import Acabamento from "./components/Acabamento";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-custom-gradient min-h-[100vh] min-w-[100vw] flex overflow-hidden flex-col items-center">
      <Header isHomePage={true} />
      <Banner />
      <About />
      <MeetUs />
      <Projects />
      <Acabamento />
      <script
        src="https://static.elfsight.com/platform/platform.js"
        data-use-service-core
        defer
      ></script>
      <div
        className="elfsight-app-1ec2dfcb-8196-43af-9ee7-6a1d9d2f64cb my-12"
        data-elfsight-app-lazy
      ></div>
      <Footer />
    </div>
  );
}
