import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import BentoGrid from "./components/BentoGrid";
import Events from "./components/Events";
import DailyDomains from "./components/DailyDomains";
import Birthdays from "./components/Birthdays";
const data = [
  {
      title: 'Welcome, Traveler! 💮',
      alt: "Here you can find information from the game, Genshin Impact, visualized with various useful information, including information about the game, such as characters, weapons and other specific things.",
  },
  {
      title: 'Characters',
      image: "/icons/characters_out.webp",
      bg: "/namecards/UI_NameCardPic_Bp5_P.png",
      link: "/characters",
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
  },
  {
      title: 'Interactive Map',
      image: "/icons/map.svg",
      link: "https://act.hoyolab.com/ys/app/interactive-map/index.html",
      bg: "/namecards/UI_NameCardPic_Bp4_P.png",
      target: true
  },
  {
      title: 'Team Builder (WIP)',
      image: "/icons/teambuilder.svg",
      bg: "/namecards/UI_NameCardPic_Md2_P.png",
      link: "/teambuilder",
  },
  {
      title: `Birthdays This Month`,
      children: <Birthdays />,
  },
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
  
]
export default function Home() {

  return (
    <>
      <NavBar />
      <main className="pt-8 md:pt-16 px-8 md:px-16 w-full flex justify-center">
        <BentoGrid data={data} type="home"/>
      </main>
      <Footer />
    </>
  );
}
