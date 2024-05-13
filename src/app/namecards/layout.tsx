import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Namecards - Tenryou 💮",
    description: "Genshin Impact namecard viewer provided with information",
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
