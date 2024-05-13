import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Artifacts - Tenryou 💮",
    description:"Find artifacts within Genshin Impact along with their sets and stats"
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
