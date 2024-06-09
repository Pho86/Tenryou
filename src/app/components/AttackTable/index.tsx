"use client"
import Image from "next/image";
import parse from "html-react-parser"
import { parseColorTags } from "@/app/utils/helper";
import { Fragment } from "react";

export default function AttackTable({ attackData, params }: { attackData: any, params: any }) {
    return <>
        {attackData && <div className="flex flex-col gap-2">
            <h3 className="font-bold text-3xl text-pretty">Combat Talents</h3>
            {/* <div className="grid gap-5"> */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                <AttackCard attack={attackData.combat1} name={params.name} attackImage={attackData.images.filename_combat1} index={1} stats />
                <AttackCard attack={attackData.combat2} name={params.name} attackImage={attackData.images.filename_combat2} index={2} stats />
                <AttackCard attack={attackData.combat3} name={params.name} attackImage={attackData.images.filename_combat3} index={3} stats />
            </div>
        </div>
        }
        {attackData && <div className="flex flex-col gap-2">
            <h3 className="font-bold text-3xl text-pretty">Passive Talents</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                <AttackCard attack={attackData.passive1} name={params.name} attackImage={attackData.images.filename_passive1} index={1} />
                <AttackCard attack={attackData.passive2} name={params.name} attackImage={attackData.images.filename_passive2} index={2} />
                <AttackCard attack={attackData.passive3} name={params.name} attackImage={attackData.images.filename_passive3} index={3} />
            </div>
        </div>
        }
    </>
}
function AttackCard({ attack, name, attackImage, index, stats = false }: { attack: any, name: string, attackImage: string, index: number, stats?: boolean }) {
    const parsedHTML = parseColorTags(attack.descriptionRaw);
    attack.parsedText = `${parsedHTML}`
    let attributes;
    let labels;
    if (stats) {
        labels = attack.attributes.labels; 
        attributes = labels.map((label: any) => {
            const [name, params] = label.split('|');
            const paramKeys = params.match(/{(.*?)}/g).map((param: string) => param.substring(1, param.indexOf(':')));
            const paramValues = paramKeys.map((paramKey: string) => attack.attributes.parameters[paramKey]);
            return { name, paramValues };
        });

    }
    const levels = 15;
    return (
        <div className="flex flex-col bg-bg-dark p-4 rounded-lg gap-2 overflow-hidden">
            <div className="flex items-center gap-2">
                <Image src={`https://enka.network/ui/${attackImage}.png`} width={55} height={55} alt={`${name} attack skill #${index}`} className="rounded-full bg-bg-light p-1 border-bg border" />
                <h3 className="font-bold text-lg text-pretty">{attack.name} </h3>
            </div>
            <pre className="text-wrap text-pretty font-signika">{parse(attack.parsedText)}</pre>
            {/* {stats &&
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right">
                        <thead className="text-xs">
                            <tr>
                                <th></th>
                                {[...Array(levels).keys()].map((index) => (
                                    <th colSpan={1} key={index} className="font-bold px-2 text-center">Level {index + 1}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {attributes.map((attribute: any, rowIndex: number) => {
                                return (
                                    <tr key={rowIndex}>
                                        <th scope="row">
                                            {attribute.name}
                                        </th>
                                        {attribute.paramValues.map((paramValue: any, colIndex: number) => {
                                            if (attribute.paramValues.length === 1) {
                                                return (
                                                    <Fragment key={index}>
                                                        {colIndex == 0 && attribute.paramValues[0].map((value: number, index: number) => (
                                                            <td className="text-center">{(value > 30 ? (value * 100).toFixed(2) : (value.toFixed(2)))}</td>
                                                        ))}
                                                    </Fragment>
                                                );
                                            } else {
                                                if (colIndex == 1) return <Fragment key={colIndex}>
                                                    {attribute.paramValues[0].map((value: number, index: number) => (
                                                        <td key={index} className="text-center h-full">
                                                            <span>{(value * 100).toFixed(2)}% </span>
                                                            <span>+</span>
                                                            <span>{(attribute.paramValues[1][index] * 100).toFixed(2)}%</span>
                                                        </td>
                                                    ))}
                                                </Fragment>
                                            }
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            } */}
        </div >
    )
}