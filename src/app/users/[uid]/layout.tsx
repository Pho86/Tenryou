import { Metadata } from 'next'

type Props = {
    params: { uid: string }
}

export async function generateMetadata(
    { params }: Props,

): Promise<Metadata> {
    const uid = params.uid

    return {
        title: `${uid}'s Profile - Tenryou 💮`,
        description:`${uid}'s, page to see all of their characters and create character or team cards.`
    }
}

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
