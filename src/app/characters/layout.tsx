import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Characters - Tenryou 💮",
    description: "Genshin Impact character database for your building needs with certain statistics",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
