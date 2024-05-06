import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Outfits - Tenryou 💮",
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
