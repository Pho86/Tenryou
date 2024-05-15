import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Database - Tenryou 💮",
    description: "Genshin Impact database home containing all your information and needs for Genshin Impact",
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
