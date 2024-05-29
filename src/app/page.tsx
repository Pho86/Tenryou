import Footer from "./components/Footer";
import BentoGrid from "./components/BentoGrid";
import Events from "./components/Events";
import DailyDomains from "./components/DailyDomains";
import Birthdays from "./components/Birthdays";
const data = [
    {
        title: 'Welcome, Traveler! 💮',
        alt: "At Tenryou, you can find information from the game, Genshin Impact, visualized with various useful information, including information about characters, weapons, artifacts, and other specific items.",
    },
    {
        title: 'Characters',
        image: "/icons/characters.webp",
        bg: "/namecards/UI_NameCardPic_Bp5_P.png",
        link: "/characters",
        description: "Find Information about characters from Genshin Impact."
    },
    {
        title: `Dailies Today`,
        children: <DailyDomains />
    },
    {
        title: 'Current Events',
        children: <Events />
    },
    {
        title: 'Users',
        image: "/icons/character.svg",
        bg: "/namecards/UI_NameCardPic_Bp2_P.png",
        link: "/users",
        description: "Find Information about the specific users that play Genshin Impact."
    },
    {
        title: 'Interactive Map',
        image: "/icons/map.webp",
        link: "https://act.hoyolab.com/ys/app/interactive-map/index.html",
        bg: "/namecards/UI_NameCardPic_Bp4_P.png",
        target: true,
        description: "Use the official hoyolab map to find specific landmarks."
    },
    {
        title: 'Team Builder (Beta)',
        image: "/icons/teambuilder.webp",
        bg: "/namecards/UI_NameCardPic_Md2_P.png",
        link: "/teambuilder",
        description: "Create and visualize your team."
    },
    {
        title: `Birthdays This Month`,
        children: <Birthdays />,
    },
    {
        title: `Materials`,
        image: "/icons/materials.webp",
        bg: "/namecards/UI_NameCardPic_Mxsy_P.png",
        link: "/materials",
        description: "Find Information about the materials and resources from Genshin Impact."
    },
    {
        title: 'Artifacts',
        image: "/icons/artifacts.webp",
        bg: "/namecards/UI_NameCardPic_Bp23_P.png",
        link: "/artifacts",
        description: "Find Information about the artifacts from Genshin Impact."
    },
    {
        title: 'Weapons',
        image: "/icons/weapons.webp",
        bg: "/namecards/UI_NameCardPic_Bp10_P.png",
        link: "/weapons",
        description: "Find Information about the weapons from Genshin Impact."
    },
    {
        title: `Namecards`,
        image: "/icons/namecards.webp",
        bg: "/namecards/UI_NameCardPic_Bp16_P.png",
        link: "/namecards",
        description: "Find Information about the namecards from Genshin Impact."
    },
    {
        title: `Outfits`,
        image: "/icons/outfits.webp",
        bg: "/namecards/UI_NameCardPic_Bp29_P.png",
        link: "/outfits",
        description: "Find Information about the outfits from Genshin Impact."
    },
    {
        title: `Elements`,
        image: "/icons/elements.webp",
        bg: "/namecards/UI_NameCardPic_EffigyChallenge_P.png",
        link: "/elements",
        description: "Find Information about the elements from Genshin Impact."
    },
    {
        title: `Achievements`,
        image: "/icons/achievements.webp",
        bg: "/namecards/UI_NameCardPic_Google_P.png",
        link: "/achievements",
        description: "Find Information about the achievements from Genshin Impact."
    },
    {
        title: `Credits/Changelog`,
        image: "/icons/credits.webp",
        bg: "/namecards/UI_NameCardPic_Bp18_P.png",
        link: "/credits",
        description: "Find Information about the changelog and credits of Tenryou."
    },

]
export default function Home() {

    return (
        <>
            {/* <NavBar /> */}
            <BentoGrid data={data} type="home" />
        </>
    );
}
