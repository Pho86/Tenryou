import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-[80dvh] flex-col items-center justify-center gap-4">
            <h1 className="text-9xl">404</h1>
            <p className="text-2xl">Page not found.</p>
            <Link href="/">
                <button className="rounded-xl border-2 border-text px-4 py-2 transition-all hover:bg-bg-dark">
                    Back To Home
                </button>
            </Link>
        </div>
    );
}