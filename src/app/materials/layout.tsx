import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Materials - Tenryou 💮",
    description: "Genshin Impact material viewer with sources to farm all your material",
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
