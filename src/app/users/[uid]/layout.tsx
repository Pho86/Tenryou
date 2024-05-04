import { Metadata } from 'next'

type Props = {
    params: { uid: string }
}

export async function generateMetadata(
    { params }: Props,

): Promise<Metadata> {
    const uid = params.uid

    return {
        title: `${uid}'s Characters - Tenryou 💮`
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
