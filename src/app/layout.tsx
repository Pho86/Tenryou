import type { Metadata, Viewport } from "next";
import { Poppins, Signika } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
const poppins = Poppins({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], variable: '--font-poppins' });
const signika = Signika({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700',], variable: '--font-signika' });
export const metadata: Metadata = {
  metadataBase: new URL("https://www.tenryou.live"),
  title: {
    default: "Home | Tenryou 💮",
    template: "%s | Tenryou 💮",
  },
  description:
    "Your Genshin Impact companion website, Tenryou, helps visualize playable characters along with a comprehensive database and data viewer for the game, Genshin Impact.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      {
        url: "/icon.svg",
      },
    ],
  },
  openGraph: {
    title: "Tenryou 💮 - Genshin Impact Companion & Database",
    description:
      "Visualize playable Genshin Impact characters, builds, artifacts, weapons, team compositions, and player stats.",
    url: "https://www.tenryou.live",
    siteName: "Tenryou",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/HomePage.png",
        width: 1200,
        height: 630,
        alt: "Tenryou Genshin Impact Companion",
      },
    ],
  },
  keywords: [
    "Genshin Impact",
    "Team Builder",
    "Genshin Weapons",
    "Genshin Fantasy",
    "Genshin Database",
    "User Search",
    "Daily Info",
    "Genshin Artifacts",
    "Genshin Characters",
    "Powered By Enka.Network",
    "Genshin DB",
    "Genshin Information",
    "Birthdays",
    "Genshin",
    "Genshin Daily Farming",
    "Genshin PC Game",
    "Mihoyo",
    "Genshin Elements",
    "Genshin Outfits and Models",
    "Farming",
    "Genshin Materials",
    "Genshin Stats",
    "Genshin Profile Cards",
    "Genshin Team Cards",
  ],
  applicationName: "Tenryou",
  twitter: {
    card: "summary_large_image",
    title: "Tenryou 💮 - Genshin Impact Companion & Database",
    description:
      "Visualize playable Genshin Impact characters, builds, artifacts, weapons, and player stats.",
    images: ["/HomePage.png"],
  },
};

export const revalidate = 86400;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tenryou",
    url: "https://www.tenryou.live",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    description:
      "Your Genshin Impact companion website. Visualize playable characters, weapon stats, artifacts, builds, and player profile data.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <Analytics />
      {/* <SpeedInsights/> */}
      <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
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