import Link from "next/link";

export default function ErrorPage() {
    return (
        <div className="h-[80dvh] flex flex-col gap-4 items-center justify-center">
                <h1 className="text-9xl">404</h1>
                <p className="text-2xl">Oops... Something went wrong.</p>
                <Link href="/" className="">
                    <button className="border-text border-2 hover:bg-bg-dark transition-all px-4 p-2 rounded-xl">Back To Home</button>
                </Link>
        </div>
    );
}