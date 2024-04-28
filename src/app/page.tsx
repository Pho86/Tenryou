"use client"
import Image from "next/image";
import NavBar from "./components/NavBar";
import { capitalizeFirstLetter, lowerCaseEachLetter, addFileName } from "./utils/helper";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react"
import Link from "next/link";
import Footer from "./components/Footer";
import BentoGrid from "./components/BentoGrid";

export default function Home() {

  const [fullData, setFullData] = useState<any[]>([]);
  // useLayoutEffect(() => {
  //   axios
  //     .get<any[]>("https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true&verboseCategories=true")
  //     .then((res) => {
  //       let names = res.data.sort();
  //       names.forEach((name) => {
  //         addFileName([name]);
  //       })
  //       setFullData(names);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching character names:", error);
  //     });
  // }, []);
  return (
    <>
      <NavBar />
      <main className="pt-16 px-8 mb-20 w-full ">
        <BentoGrid/>
      </main>
      <Footer />
    </>
  );
}
