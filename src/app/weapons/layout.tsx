import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Weapons - Tenryou 💮",
    description: "Genshin Impact weapon viewer with stats to improve your builds",
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
