import Footer from "../components/Footer";
import BentoGrid from "../components/BentoGrid";

const data = [
    {
        title: `Materials`,
        image: "/icons/materials.svg",
        bg: "/namecards/UI_NameCardPic_Mxsy_P.png",
        link: "/materials",
    },
    {
        title: 'Artifacts',
        image: "/icons/artifacts.svg",
        bg: "/namecards/UI_NameCardPic_Bp23_P.png",
        link: "/artifacts",
    },
    {
        title: 'Weapons',
        image: "/icons/weapons.svg",
        bg: "/namecards/UI_NameCardPic_Bp10_P.png",
        link: "/weapons",
    },
    {
        title: `Namecards`,
        image: "/icons/namecards.svg",
        bg: "/namecards/UI_NameCardPic_Bp16_P.png",
        link: "/namecards",
    },
    {
        title: `Outfits`,
        image: "/icons/outfits.svg",
        bg: "/namecards/UI_NameCardPic_Bp29_P.png",
        link: "/outfits",
    },
    {
        title: `Elements`,
        image: "/icons/elements.svg",
        bg: "/namecards/UI_NameCardPic_EffigyChallenge_P.png",
        link: "/elements",
    },
    {
        title: `Achievements`,
        image: "/icons/achievements.svg",
        bg: "/namecards/UI_NameCardPic_Google_P.png",
        link: "/achievements",
    },
    {
        title: 'Interactive Map',
        image: "/icons/map.svg",
        link: "https://act.hoyolab.com/ys/app/interactive-map/index.html",
        bg: "/namecards/UI_NameCardPic_Bp4_P.png",
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
