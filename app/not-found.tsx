"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 text-center">
      <h1 className="text-xl font-bold text-text-primary font-figtree">Not Found!</h1>

      <Link
        href="/"
        className="px-6 py-2 rounded border border-border bg-surface text-text-primary font-figtree transition-colors hover:border-text-primary"
      >
        Go Home
      </Link>
    </main>
  );
}
