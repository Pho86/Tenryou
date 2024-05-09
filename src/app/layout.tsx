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
  description: "Your Genshin Impact companion website, helps players view other players character information along with a comprehensive database and viewer for the game.",
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
    type: "website"
  },
  keywords: ["Genshin Impact", "Team Builder", "Genshin Weapons", "Genshin Fantasy", "Genshin Database", "User Search", "Daily Info", "Genshin Artifacts", "Genshin Characters", "Powered By Enka.Network", "Genshin DB", "Genshin Information", "Birthdays", "Genshin", "Genshin Daily Farming", "Genshin PC Game", "Mihoyo", "Genshin Elements", "Genshin Outfits and Models", "Farming", "Genshin Materials", "Genshin Stats"],
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
        <body className={` ${signika.className} ${signika.variable} ${poppins.variable}   scroll-smooth`}>
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