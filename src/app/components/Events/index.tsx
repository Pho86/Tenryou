import axios from "axios";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import parse from 'html-react-parser';
import { AnimatePresence, motion } from "framer-motion";
export default function Events() {
    const [events, setEvents] = useState<any>();
    const [show, setShow] = useState<number>(0)
    useLayoutEffect(() => {
        axios
            .get<any[]>("https://api.ambr.top/assets/data/event.json")
            .then((res) => {
                console.log(res.data)
                setEvents(res.data)
            })
            .catch((error) => {
                console.error("Error fetching character names:", error);
            });
    }, [])

    return <>
        <div className="py-2 flex gap-4 flex-col overflow-y-auto pb-8">
            {events && (
                <div className="flex flex-col gap-4">
                    {Object.keys(events).map(key => {
                        return <div key={key} className="pb-2 border-b-2 border-text ">
                            <div className="px-4 flex flex-col gap-2 cursor-pointer" onClick={() => { setShow(events[key].id) }}>
                                <Image src={events[key].banner.EN} width={600} height={600} className="w-full" alt={`${events[key].nameFull.EN} event banner`} />
                                <p className="text-md font-semibold">
                                    {events[key].nameFull.EN}
                                </p>
                            </div>
                            <AnimatePresence>
                                {show == events[key].id &&
                                    <>
                                        <div className="fixed w-[100vw] h-[100dvh] top-0 left-0 z-50 flex items-center bg-bg bg-opacity-[30%] justify-center" onClick={() => { setShow(2); console.log(show) }}>
                                            <motion.div className="max-h-[70dvh] md:max-h-[80dvh] md:max-w-[60dvw] p-8 overflow-y-scroll bg-bg rounded-xl" onClick={(e) => e.stopPropagation()}
                                                initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} transition={{ ease: "easeInOut" }}
                                            >
                                                <h3 className="text-xl font-bold pb-4">{events[key].nameFull.EN}</h3>
                                                <Image src={events[key].banner.EN} width={800} height={800} className="w-full" alt={`${events[key].nameFull.EN} event banner`} />
                                                {parse(events[key].description.EN)}
                                            </motion.div>
                                        </div>
                                    </>
                                }
                            </AnimatePresence>
                        </div>
                    })}
                </div>
            )}
        </div >
    </>
}