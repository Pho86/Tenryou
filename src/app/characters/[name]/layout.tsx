import { Metadata } from 'next'

type Props = {
    params: { name: string }
}

export async function generateMetadata(
    { params }: Props,

): Promise<Metadata> {
    const name = decodeURIComponent(params.name);

    return {
        title: `${name} - Tenryou 💮`,
        description:`${name} from Genshin Impact information and statistics viewer`
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
