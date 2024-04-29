import Image from "next/image";
export default function IconButtonSwitch({
    onClick = () => { },
    name,
    index,
    type = "weapons",
    active
}: {
    onClick: () => void;
    name: string,
    index: number
    type?: string,
    active: number
}) {
    return <Image src={`/${type == "weapons" ? "weapons" : "elements"}/${name}.${type == "weapons" ? "png" : "webp"}`} width={50} height={50} alt="Pyro Icon" className={`w-10 h-10 md:w-12 md:h-12 p-1 cursor-pointer hover:bg-bg-dark transition-all ${active == index && "bg-bg-dark"} p-1 rounded-xl `} onClick={onClick} />
}