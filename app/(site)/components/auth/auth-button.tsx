"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "@/lib/auth-client";

export default function AuthButton() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div data-testid="auth-loading" className="h-8 w-8 rounded-full bg-white/20 animate-pulse" />;
  }

  if (session?.user) {
    return (
      <button
        onClick={() => signOut()}
        className="flex items-center gap-2"
        aria-label="Sign out"
      >
        {session.user.image
          ? (
              <Image
                src={session.user.image}
                alt={session.user.name ?? "User"}
                width={32}
                height={32}
                className="rounded-full"
              />
            )
          : (
              <div className="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center text-white text-sm font-bold">
                {session.user.name?.[0] ?? "?"}
              </div>
            )}
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn.social({ provider: "google" })}
      className="font-header cursor-pointer pt-0.5 font-semibold uppercase text-white/90 hover:text-white"
    >
      Sign In
    </button>
  );
}
