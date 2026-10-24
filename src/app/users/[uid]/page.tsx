import Profile from "@/app/components/Profile";
import Link from "next/link";
import { addFileName } from "@/app/utils/helper";
import { getPlayer } from "@/app/utils/enka";
import UserSearchForm from "@/app/components/UserSearchForm";
import { User } from "@/app/types/user";

export const revalidate = 300;

export default async function UIDPage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;

  let playerData: User | undefined;

  try {
    const raw = await getPlayer(uid);
    playerData = raw as unknown as User;

    if (!playerData?.characters?.length) {
      throw new Error("No characters found");
    }

    playerData.characters.forEach((character) => {
      addFileName([character]);
    });
  } catch (error) {
    console.error(error);
  }

  if (!playerData?.characters?.length) {
    return (
      <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-6 py-12 text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <div className="flex max-w-md flex-col gap-2">
          <p className="text-2xl font-semibold">We couldn&apos;t load UID {uid}.</p>
          <p className="text-text/60">
            The UID may be incorrect, or the profile API may be unavailable.
            Check the number and try again.
          </p>
        </div>
        <UserSearchForm variant="compact" initialUid={uid} className="w-full max-w-sm" />
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/users"
            className="inline-flex h-10 items-center rounded-xl border border-bg-lighter px-4 text-sm font-semibold transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Back to user search
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-text/60 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return <Profile user={playerData} />;
}
