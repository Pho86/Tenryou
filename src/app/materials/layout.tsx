import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Materials",
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
