import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Users - Tenryou 💮",
    description: "Genshin Impact user search to view user your own profile cards and create team cards.",
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
