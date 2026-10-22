import { Metadata } from 'next'

type Props = {
    params: Promise<{ name: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { name } = await params;
    const decodedName = decodeURIComponent(name);

    const description = `Discover ${decodedName} builds, recommended weapons, best artifacts, talents, and statistics in Genshin Impact on Tenryou.`;
    const pageUrl = `https://www.tenryou.live/characters/${encodeURIComponent(name)}`;

    return {
        title: `${decodedName} Build & Stats`,
        description,
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title: `${decodedName} - Genshin Impact Build & Guide | Tenryou`,
            description,
            url: pageUrl,
            type: "article",
            images: [
                {
                    url: "https://www.tenryou.live/HomePage.png",
                    width: 1200,
                    height: 630,
                    alt: `${decodedName} Genshin Impact Guide`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${decodedName} - Genshin Impact Guide`,
            description,
            images: ["https://www.tenryou.live/HomePage.png"],
        },
        keywords: [
            decodedName,
            `${decodedName} Genshin Impact`,
            `${decodedName} build`,
            `${decodedName} weapons`,
            `${decodedName} artifacts`,
            `${decodedName} talents`,
            "Genshin Impact builds",
        ],
    };
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ name: string }>;
}>) {
    return (
        <>
            {children}
        </>
    );
}
