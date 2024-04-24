"use client"
import Image from "next/image";
import NavBar from "./components/NavBar";
import { capitalizeFirstLetter } from "./utils/helper";
import axios from "axios";
import { useLayoutEffect, useState } from "react"
import Link from "next/link";
import Footer from "./components/Footer";
export default function Home() {

  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState('');
  const link = `https://genshin.jmp.blue/characters/`
  useLayoutEffect(() => {
    axios
      .get<any[]>("https://genshin.jmp.blue/characters")
      .then((res) => {
        console.log(res.data);
        // @ts-ignore
        setData(res.data)
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);
  return (
    <>
      <NavBar />
      <main className="pt-16 flex flex-wrap gap-4 px-4 justify-center items-center mb-20">
        {data.length > 0 && data.map((dat) => (
          <Link key={dat} href={`/characters/${dat}`} className="flex flex-col self-start rounded-lg bg-white transition hover:-translate-y-1">
            <Image src={`https://genshin.jmp.blue/characters/${dat}/icon-big`} width={200} height={200} alt="Image w-full" className={`w-[10rem] h-[10rem] rounded-t-lg rounded-b-2xl bg-[#483E67]`} />
            <p className="text-center w-full h-full p-2 bg-[#E9E5DC] text-black font-bold rounded-lg">{capitalizeFirstLetter(dat)}</p>
          </Link>
        ))}
        <Footer/>
      </main>
    </>
  );
}
