"use client"
import Image from "next/image";
import NavBar from "../components/NavBar";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useLayoutEffect, useState } from "react"
export default function CharacterPage({params}:{params:any}) {

  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useLayoutEffect(() => {
    console.log(params)
    axios
      .get<any[]>(`https://genshin.jmp.blue/characters/`)
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
      <main className="pt-16">
        {data.length > 0 && data.map((dat) => (
          <li key={dat.id} className="flex flex-col">
            {data} 
              
            </li>
        ))}
      </main>
    </>
  );
}
