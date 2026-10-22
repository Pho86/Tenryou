import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Characters - Tenryou 💮",
    default: "Characters - Tenryou 💮",
    template: "%s - Tenryou 💮",
  },
  description:
    "Genshin Impact character database for your building needs with certain statistics",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ [key: string]: string }>;
}>) {
    return (
        <>
            {children}
        </>
    );
}
