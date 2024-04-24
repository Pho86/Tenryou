'use client';
import React, { useLayoutEffect, useRef } from 'react'
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PageIntro({
    image
}: { image: string }) {

    const background = useRef(null);
    const introImage = useRef(null);

    return (
        <div className={""}>
            <div className={"mt-38"} ref={background}>
                <Image
                    src={image}
                    fill={true}
                    alt="background image"
                    priority={true}
                    className='h-[140dvh] object-cover'
                />
            </div>
        </div>
    )
}