import BentoGrid from "./components/BentoGrid";
import Events from "./components/Events";
import DailyDomains from "./components/DailyDomains";
import Birthdays from "./components/Birthdays";


export default async function Home() {
    const response = await fetch(`https://api.ambr.top/assets/data/event.json`, {
        cache: 'no-cache'
    });
    
    if (!response.ok) {
        throw new Error("failed to fetch")
    }
    const EventsData = await response.json()

    const data = [
        {
            title: 'Welcome, Traveler! 💮',
            alt: "At Tenryou, you can find information from the game, Genshin Impact, visualized with various useful information, including information about characters, weapons, artifacts, and other specific items.",
        },
        {
            title: 'Characters',
            image: "/icons/characters.webp",
            bg: "/homepage/characters.webp",
            link: "/characters",
            description: "Find Information about characters from Genshin Impact."
        },
        {
            title: `Dailies Today`,
            children: <DailyDomains />
        },
        {
            title: 'Current Events',
            children: <Events Events={EventsData} />
        },
        {
            title: 'Users',
            image: "/icons/character.svg",
            bg: "/homepage/users.webp",
            link: "/users",
            description: "Find Information about the specific users that play Genshin Impact."
        },
        {
            title: 'Interactive Map',
            image: "/icons/map.webp",
            link: "https://act.hoyolab.com/ys/app/interactive-map/index.html",
            bg: "/homepage/map.webp",
            target: true,
            description: "Use the official hoyolab map to find specific landmarks."
        },
        {
            title: 'Team Builder (Beta)',
            image: "/icons/teambuilder.webp",
            bg: "/homepage/teambuilder.webp",
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
            bg: "/homepage/materials.webp",
            link: "/materials",
            description: "Find Information about the materials and resources from Genshin Impact."
        },
        {
            title: 'Artifacts',
            image: "/icons/artifacts.webp",
            bg: "/homepage/artifacts.webp",
            link: "/artifacts",
            description: "Find Information about the artifacts from Genshin Impact."
        },
        {
            title: 'Weapons',
            image: "/icons/weapons.webp",
            bg: "/homepage/weapons.webp",
            link: "/weapons",
            description: "Find Information about the weapons from Genshin Impact."
        },
        {
            title: `Namecards`,
            image: "/icons/namecards.webp",
            bg: "/homepage/namecards.webp",
            link: "/namecards",
            description: "Find Information about the namecards from Genshin Impact."
        },
        {
            title: `Outfits`,
            image: "/icons/outfits.webp",
            bg: "/homepage/outfits.webp",
            link: "/outfits",
            description: "Find Information about the outfits from Genshin Impact."
        },
        {
            title: `Elements`,
            image: "/icons/elements.webp",
            bg: "/homepage/elements.webp",
            link: "/elements",
            description: "Find Information about the elements from Genshin Impact."
        },
        {
            title: `Achievements`,
            image: "/icons/achievements.webp",
            bg: "/homepage/achievements.webp",
            link: "/achievements",
            description: "Find Information about the achievements from Genshin Impact."
        },
        {
            title: `Credits/Changelog`,
            image: "/icons/credits.webp",
            bg: "/homepage/credits.webp",
            link: "/credits",
            description: "Find Information about the changelog and credits of Tenryou."
        },

    ]

    return (
        <>
            <BentoGrid data={data} type="home" />
        </>
    );
}
