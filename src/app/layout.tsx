import type { Metadata, Viewport } from "next";
import { Poppins, Signika } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.scss";
import NextTopLoader from 'nextjs-toploader';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
const poppins = Poppins({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], variable: '--font-poppins' });
const signika = Signika({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700',], variable: '--font-signika' });
export const metadata: Metadata = {
  title: "Home - Tenryou 💮",
  description: "Your Genshin Impact companion website, Tenryou, helps visualize playable characters along with a comprehensive database and data viewer for the game, Genshin Impact.",
  icons: {
    icon: [
      {
        url: '/icon.svg',
      },
    ],
  },
  openGraph: {
    title: 'Tenryou 💮',
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.tenryou.live/icon.svg",
        width: 800,
        height: 800,
      }
    ]
  },
  keywords: ["Genshin Impact", "Team Builder", "Genshin Weapons", "Genshin Fantasy", "Genshin Database", "User Search", "Daily Info", "Genshin Artifacts", "Genshin Characters", "Powered By Enka.Network", "Genshin DB", "Genshin Information", "Birthdays", "Genshin", "Genshin Daily Farming", "Genshin PC Game", "Mihoyo", "Genshin Elements", "Genshin Outfits and Models", "Farming", "Genshin Materials", "Genshin Stats", "Genshin Profile Cards", "Genshin Team Cards"],
  applicationName: "Tenryou",
  twitter: {
    card: 'summary'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Analytics />
      {/* <SpeedInsights/> */}
      <html lang="en" suppressHydrationWarning>
        <body className={` ${signika.className} ${signika.variable} ${poppins.variable} bg-bg transition-all scroll-smooth `}>
          <NextTopLoader
            color="#FF7373"
            height={5} zIndex={2000}
            showSpinner={false}
            easing="easeInOut"
            shadow="false"
          />
          <NavBar />
          <main className="pt-4 sm:pt-8 md:pt-16 lg:pt-20 px-4 sm:px-8 md:px-16 w-full flex flex-col justify-between items-center gap-2 min-h-[100dvh]">
            <div className="flex flex-col gap-2 max-w-screen-2xl w-full">
              {children}
            </div>
            <Footer />
          </main>
        </body>
      </html>
    </>
  );
}


export const viewport: Viewport = {
  width: "device-width",
  themeColor: 'black',
  colorScheme: 'dark',
}