import Link from "next/link";
import Footer from "@/app/components/Footer";

export default function ErrorPage() {
    return (
        <>
            <main className="flex h-screen flex-col gap-10 items-center justify-center relative">
                <h1 className="text-9xl">404</h1>
                <p className="text-2xl">Oops... Something went wrong, maybe you inputted the wrong UID, or the account was not public.</p>
                <Link href="/" className="">
                    <button className="border-text border-2 hover:bg-bg-dark transition-all px-4 p-2 rounded-xl">Back To Home</button>
                </Link>
                <div className="absolute bottom-0 w-full">
                    <Footer />
                </div>
            </main>
        </>
    );
}