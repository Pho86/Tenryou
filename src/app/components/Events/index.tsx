"use client"

import Image from "next/image";
import { useState } from "react";
import parse from 'html-react-parser';
import { AnimatePresence, motion } from "framer-motion";
import { Events as EventTypes } from "@/app/types/events";
export default function EventsModal({
    Events
}: {
    Events: EventTypes[]
}) {
    const [show, setShow] = useState<number>(0)

    return <>
        <div className="py-2 flex gap-4 flex-col overflow-y-auto pb-8">
            {Object.keys(Events).map((key) => {
                // @ts-ignore
                const event = Events[key];
                return (
                    <div key={event.id} className="pb-2 border-b-2 border-text">
                        <div
                            className="p-4 flex flex-col gap-2 cursor-pointer hover:bg-bg-light transition-all"
                            onClick={() => {
                                setShow(event.id);
                            }}
                        >
                            <Image src={event.banner.EN} width={600} height={600} className="w-full" alt={`${event.nameFull.EN} event banner`} />
                            <p className="text-md font-semibold">{event.nameFull.EN}</p>
                        </div>
                        <AnimatePresence>
                            {show === event.id && (
                                <div
                                    className="fixed w-[100vw] h-[100dvh] top-0 left-0 z-50 flex items-center bg-bg bg-opacity-[30%] justify-center"
                                    onClick={() => {setShow(0);}}
                                >
                                    <motion.div
                                        className="max-h-[70dvh] md:max-h-[80dvh] md:max-w-[60dvw] p-8 overflow-y-scroll bg-bg rounded-xl"
                                        onClick={(e) => e.stopPropagation()}
                                        initial={{ opacity: 0, y: -50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 50 }}
                                        transition={{ ease: 'easeInOut' }}
                                    >
                                        <h3 className="text-xl font-bold pb-4">{event.nameFull.EN}</h3>
                                        <p>
                                            Starts at: {event.startAt}. Ends at: {event.endAt}
                                        </p>
                                        <Image src={event.banner.EN} width={800} height={800} className="w-full" alt={`${event.nameFull.EN} event banner`} />
                                        {parse(event.description.EN)}
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div >
    </>
}