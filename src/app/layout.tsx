import type { Metadata, Viewport } from "next";
import { Poppins, Signika } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.scss";
import NextTopLoader from 'nextjs-toploader';

const poppins = Poppins({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], variable: '--font-poppins' });
const signika = Signika({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700',], variable: '--font-signika' });
export const metadata: Metadata = {
  title: "Home - Tenryou 💮",
  description: "Your Genshin Impact companion website, helps players view other players character information along with a database for the game, Genshin Impact with a work in Progress teambuilder.",
  icons: {
    icon: [
      {
        url: '/logo.svg',
      },
    ],
  },
  openGraph: {
    title: 'Tenryou 💮',
    locale: "en_US",
    type: "website"
  },
  keywords: ["Genshin Impact", "Team Builder", "Weapons", "Fantasy", "Database", "User Search", "Daily Info", "Artifacts", "Characters", "Enka.Network", "DB", "Genshin Information", "Birthdays", "Genshin", "Daily Farming", "PC Game", "Mihoyo", "Elements", "Outfits", "Farming", "Materials", "Stats"],
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  applicationName: "Tenryou",

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
      <html lang="en">
        <body className={` ${signika.className} ${signika.variable} ${poppins.variable}  scroll-smooth`}>
          <NextTopLoader
            color="#FF7373"
            height={5} zIndex={2000}
            showSpinner={false}
          />
          {children}
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