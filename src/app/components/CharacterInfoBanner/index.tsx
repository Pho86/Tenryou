"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Character } from "@/app/types/character"

const STAR = "★ "

export default function InfoCharacterBanner({
  characterData,
}: {
  characterData: Character;
  charName: string;
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const parallax = Math.min(scrollY * 0.25, 160)
  const rarityStars = Array(characterData.rarity ?? 5).fill(STAR).join("")

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[720px] w-full overflow-hidden">
      <div className="absolute inset-0">
        {characterData.region && (
          <Image
            src={`/regions/${characterData.region}.webp`}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-contain object-[50%_35%] p-[4%] scale-110 opacity-30 blur-[1px]"
          />
        )}
        <Image
          src={`https://enka.network/ui/UI_Gacha_AvatarImg_${characterData.fileName}.png`}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_25%] scale-[1.02]"
          style={{ transform: `translateY(${parallax}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-darkest/40 via-bg-dark/55 to-bg-dark" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            {characterData.elementText && (
              <span className="flex items-center gap-2 rounded-full border border-text/20 bg-bg-dark/60 px-3 py-1.5 backdrop-blur-[1px]">
                <Image
                  src={`/elements/${characterData.elementText}.webp`}
                  width={18}
                  height={18}
                  alt=""
                  className="h-[18px] w-[18px]"
                />
                <span className="text-sm font-medium text-text/90">{characterData.elementText}</span>
              </span>
            )}
            {characterData.weaponText && (
              <span className="flex items-center gap-2 rounded-full border border-text/20 bg-bg-dark/60 px-3 py-1.5 backdrop-blur-[1px]">
                <Image
                  src={`/weapons/${characterData.weaponText}.png`}
                  width={22}
                  height={14}
                  alt=""
                  className="h-[14px] w-[22px] object-contain"
                />
                <span className="text-sm font-medium text-text/90">{characterData.weaponText}</span>
              </span>
            )}
            {characterData.region && (
              <span className="flex items-center gap-2 rounded-full border border-text/20 bg-bg-dark/60 px-3 py-1.5 backdrop-blur-[1px]">
                <Image
                  src={`/regions/${characterData.region}.webp`}
                  width={18}
                  height={18}
                  alt=""
                  className="h-[18px] w-[18px]"
                />
                <span className="text-sm font-medium text-text/90">{characterData.region}</span>
              </span>
            )}
          </div>

          <p className="text-2xl tracking-[0.5em] text-primary md:text-3xl">{rarityStars}</p>

          <div>
            <h1 className="text-6xl font-bold leading-none text-text md:text-8xl lg:text-9xl">
              {characterData.name}
            </h1>
            {characterData.title && (
              <p className="mt-4 font-signika text-2xl italic text-primary md:text-3xl lg:text-4xl">
                {characterData.title}
              </p>
            )}
          </div>

          {characterData.description && (
            <p className="max-w-2xl text-base leading-relaxed text-text/80 md:text-lg">
              {characterData.description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
