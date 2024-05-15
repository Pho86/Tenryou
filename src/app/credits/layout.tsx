import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Credits - Tenryou 💮",
    description: "Credits for Tenryou,",
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
