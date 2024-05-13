import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Outfits - Tenryou 💮",
    description: "Genshin Impact outfit and skin viewer",
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
