import Image from "next/image";
import { FaStar } from "react-icons/fa";
export default function IconButtonSwitch({
    onClick = () => { },
    name,
    index,
    type = "weapons",
    active,
    star,
    className
}: {
    onClick: () => void;
    name?: string,
    index: number
    type?: string,
    active: number,
    star?: boolean,
    className?: string
}) {
    return <>
        {star ?
            <div className={`p-2 ${active == index && "bg-bg-dark"} hover:bg-bg-dark transition-all  cursor-pointer flex justify-center items-center rounded-xl`} onClick={onClick}>
                <FaStar className={`text-2xl ${className}`}/>
            </div>
            :
            <Image src={`/${type == "weapons" ? "weapons" : "elements"}/${name}.${type == "weapons" ? "png" : "webp"}`} width={50} height={50} alt={`${name} icon button`} className={`w-10 h-10 md:w-12 md:h-12 p-1 cursor-pointer hover:bg-bg-dark transition-all ${active == index && "bg-bg-dark"} p-1 rounded-xl `} onClick={onClick} />
        }
    </>
}