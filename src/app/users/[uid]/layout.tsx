import { Metadata } from 'next'

type Props = {
    params: Promise<{ uid: string }>
}

export async function generateMetadata(
    { params }: Props,

): Promise<Metadata> {
    const {uid} = await params;

    return {
        title: `${uid}'s Profile`,
        description: `View UID ${uid}'s characters and create character or team cards.`
    }
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ uid: string }>;
}>) {
    return (
        <>
            {children}
        </>
    );
}
