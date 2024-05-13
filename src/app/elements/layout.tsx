import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Elements - Tenryou 💮",
    description: "Genshin Impact elements and elemental reactions.",
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
