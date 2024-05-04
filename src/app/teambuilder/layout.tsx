import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Team Builder - Tenryou 💮",
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
