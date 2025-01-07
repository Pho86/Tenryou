import { Metadata } from 'next'

type Props = {
    params: { name: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { name } = await params;

    const decodedName = decodeURIComponent(name);

    return {
        title: decodedName,
        description: `${decodedName} from Genshin Impact information and statistics viewer`,
    };
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
