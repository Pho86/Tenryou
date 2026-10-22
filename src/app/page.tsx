import QuickNavCards from "./components/Home/QuickNavCards";
import DailiesCard from "./components/Home/DailiesCard";
import EventsCard, { SingleEvent } from "./components/Home/EventsCard";
import BirthdaysCard from "./components/Home/BirthdaysCard";

export const revalidate = 3600;

export default async function Home() {
  let eventsData: Record<string, SingleEvent> | null = null;

  try {
    const response = await fetch("https://gi.yatta.moe/assets/data/event.json", {
      next: { revalidate: 3600 },
    });
    if (response.ok) {
      eventsData = await response.json();
    }
  } catch (error) {
    console.error("Failed to fetch events data:", error);
  }

  return (
    <div className="flex flex-col gap-6 md:gap-7 w-full pb-8">
      {/* Hero Welcome Header */}
      <section className="flex flex-col gap-1.5 pt-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
          Welcome, Traveler! 🌸
        </h1>
        <p className="text-sm sm:text-base text-text/75 max-w-3xl leading-relaxed">
          Tenryou is a companion site for Genshin Impact, with characters,
          weapons, artifacts, and more laid out so the details are easy to find.
        </p>
      </section>

      {/* Top 5 Quick Navigation Cards */}
      <QuickNavCards />

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Dailies Today */}
        <div className="lg:col-span-7 xl:col-span-7 w-full">
          <DailiesCard />
        </div>

        {/* Right Column: Current Events + Birthdays This Month */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-6 w-full">
          <EventsCard eventsData={eventsData} />
          <BirthdaysCard />
        </div>
      </div>
    </div>
  );
}
