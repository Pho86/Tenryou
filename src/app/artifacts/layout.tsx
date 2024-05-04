import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Artifacts - Tenryou 💮",
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
