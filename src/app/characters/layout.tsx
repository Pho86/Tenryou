import type { Metadata } from "next";
import { Poppins, Signika } from "next/font/google";

export const metadata: Metadata = {
    title: "Characters - Tenryou 💮",
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
