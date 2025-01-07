import Link from 'next/link';
import Image from 'next/image';
import { Character } from '@/app/types/character';
export default function CharacterCardSingle({ character }: { character: Character }) {
    return (
        <Link
            id={character.name}
            href={`/characters/${character.name}`}
            className={`bg-[#e9e9e9] transition-all relative rounded-xl cursor-pointer hover:scale-105 hover:shadow-light`}
        >
            <div className={`flex flex-col self-start `}>
                <div className="absolute top-1 left-1 text-black">
                    <Image
                        src={`/elements/${character.elementText}.webp`}
                        width={25}
                        height={25}
                        alt={`${character.element} icon`}
                    />
                </div>
                {character.region && (
                    <div className="absolute top-1 right-1 text-black">
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
                    className={`rounded-t-xl rounded-br-4xl max-h-44 w-full object-cover bg-gradient-to-br ${
                        character.rarity == 4
                            ? " from-gradient-SR-start  to-gradient-SR-end"
                            : "from-gradient-SSR-start  to-gradient-SSR-end"
                    }`}
                />
                <p className="text-center w-full text-xs text-nowrap p-2 text-black relative font-bold rounded-b-xl ">
                    {character.name}
                </p>
            </div>
        </Link>
    );
}
