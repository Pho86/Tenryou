import BentoGrid from "../components/BentoGrid";

const data = [
    {
        title: `Materials`,
        image: "/icons/materials.webp",
        bg: "/homepage/materials.webp",
        link: "/materials",
    },
    {
        title: 'Artifacts',
        image: "/icons/artifacts.webp",
        bg: "/homepage/artifacts.webp",
        link: "/artifacts",
    },
    {
        title: 'Weapons',
        image: "/icons/weapons.webp",
        bg: "/homepage/weapons.webp",
        link: "/weapons",
    },
    {
        title: `Namecards`,
        image: "/icons/namecards.svg",
        bg: "/homepage/namecards.webp",
        link: "/namecards",
    },
    {
        title: `Outfits`,
        image: "/icons/outfits.svg",
        bg: "/homepage/outfits.webp",
        link: "/outfits",
    },
    {
        title: `Elements`,
        image: "/icons/elements.webp",
        bg: "/homepage/elements.webp",
        link: "/elements",
    },
    {
        title: `Achievements`,
        image: "/icons/achievements.webp",
        bg: "/homepage/achievements.webp",
        link: "/achievements",
    },
    {
        title: 'Interactive Map',
        image: "/icons/map.webp",
        link: "https://act.hoyolab.com/ys/app/interactive-map/index.html",
        bg: "/homepage/map.webp",
        target: true
    },
]

export default function Database() {

    return (
        <>
            <h1 className="text-3xl text-primary">Database List</h1>
            <BentoGrid data={data} />
        </>
    );
}
