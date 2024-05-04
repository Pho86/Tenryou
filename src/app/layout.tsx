import type { Metadata } from "next";
import { Poppins, Signika } from "next/font/google";

import "./globals.scss";
import NextTopLoader from 'nextjs-toploader';

const poppins = Poppins({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], variable: '--font-poppins' });
const signika = Signika({ subsets: ["latin"], weight: [ '300', '400', '500', '600', '700', ], variable: '--font-signika' });

export const metadata: Metadata = {
  title: "Home - Tenryou 💮",
  description: "A Genshin Impact companion website, helps view other users along with a database for the game with a teambuilder.",
  icons: {
    icon: [
      {
        url: '/logo.svg',
      },
    ],
  },
  keywords: ["Genshin Impact", "Team Builder", "Weapons", "Fantasy", "Database", "User Search", "Daily Info", "Artifacts", "Characters"],
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
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
