import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import BentoGrid from "./components/BentoGrid";

export default function Home() {

  return (
    <>
      <NavBar />
      <main className="pt-8 md:pt-16 px-8 md:px-16 w-full flex justify-center">
        <BentoGrid />
      </main>
      <Footer />
    </>
  );
}
