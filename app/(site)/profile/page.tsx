"use client";

import { signOut, useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!session?.user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Please <a href="/api/auth/signin" className="text-blue-600 underline">sign in</a> to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <p className="mb-2">{session.user.name}</p>
      <p className="mb-6 text-gray-600">{session.user.email}</p>
      <button
        onClick={() => signOut()}
        className="rounded-md bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700"
      >
        Sign out
      </button>
    </div>
  );
}
