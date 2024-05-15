import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Team Builder - Tenryou 💮",
    description: "Genshin Impact team builder tool to build abyss or exploration teams",
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
