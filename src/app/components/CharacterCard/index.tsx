import Link from 'next/link';
import Image from 'next/image';
import { Character } from '@/app/types/character';

export default function CharacterCardSingle({ character }: { character: Character }) {
    return (
        <Link
            id={character.name}
            href={`/characters/${character.name}`}
            className={`group bg-[#e9e9e9] transition-all relative rounded-xl cursor-pointer hover:scale-105 hover:shadow-light`}
        >
            <div className={`flex flex-col self-start`}>
                <div className="absolute top-1 left-1 text-black z-10">
                    <Image
                        src={`/elements/${character.elementText}.webp`}
                        width={25}
                        height={25}
                        alt={`${character.element} icon`}
                    />
                </div>
                {character.region && (
                    <div className="absolute top-1 right-1 text-black z-10">
                        <Image
                            src={`/regions/${character.region}.webp`}
                            width={25}
                            height={25}
                            alt={`${character.region} icon`}
                        />
                    </div>
                )}
                <Image
                    src={`https://enka.network/ui/UI_AvatarIcon_${character.fileName}.png`}
                    width={200}
                    height={200}
                    alt={`${character.name} the ${character.title}`}
                    title={`${character.name} the ${character.title}`}
                    className={`h-48 w-full rounded-t-xl rounded-br-4xl object-cover bg-gradient-to-br sm:h-52 ${
                        character.rarity == 4
                            ? " from-gradient-SR-start  to-gradient-SR-end"
                            : "from-gradient-SSR-start  to-gradient-SSR-end"
                    }`}
                />
                <p className="text-center w-full text-xs text-nowrap p-2 text-black relative font-bold rounded-b-xl">
                    {character.name}
                </p>
                {character.description && (
                    <div className="pointer-events-none absolute left-1/2 top-full z-[999] mt-2 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <div className="rounded-lg bg-black/90 px-3 py-2 text-xs text-white shadow-lg">
                            <div className="font-semibold whitespace-nowrap">{character.name}</div>
                            {character.title && <div className="text-white/70 whitespace-nowrap">{character.title}</div>}
                            <div className="mt-1 whitespace-normal break-words text-white/80">{character.description}</div>
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
}
