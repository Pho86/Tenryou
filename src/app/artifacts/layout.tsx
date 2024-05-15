import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Artifacts - Tenryou 💮",
    description:"Find artifacts within Genshin Impact along with their respective sets and stats for your builds"
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
