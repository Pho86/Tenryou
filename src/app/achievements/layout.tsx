import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Achievements - Tenryou 💮",
    description: "Find your specific Genshin Impact achievements and earn your primogems",
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
