import { SurahPageShimmer } from "@/app/components/SurahReader";

export default function Loading() {
  return (
    <main className="w-full py-4 min-h-screen flex flex-col justify-center">
      <div className="h-12 w-48 bg-surface/50 animate-pulse rounded-md mb-8 mx-auto" />
      <div className="h-16 w-64 bg-surface/50 animate-pulse rounded-md mb-8 mx-auto" />
      <SurahPageShimmer />
    </main>
  );
}
