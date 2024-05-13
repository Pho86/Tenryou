import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Database - Tenryou 💮",
    description: "Genshin Impact database home for all your needs",
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
