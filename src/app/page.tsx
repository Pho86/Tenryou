import NavBar from "./components/NavBar";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react"
import Link from "next/link";
import Footer from "./components/Footer";
import BentoGrid from "./components/BentoGrid";

export default function Home() {

  return (
    <>
      <NavBar />
      <main className="pt-8 md:pt-16 px-8 mb-20 w-full ">
        <BentoGrid/>
      </main>
      <Footer />
    </>
  );
}
