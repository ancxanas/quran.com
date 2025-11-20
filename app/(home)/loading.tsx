import HeaderIcon from "../../public/icons/header.svg";
import { SurahListShimmer } from "../components/SurahList/index";

export default function Loading() {
  return (
    <main className="p-6">
      <header className="mb-8 flex justify-center text-text-primary opacity-50 animate-pulse">
        <HeaderIcon className="w-96 h-48" />
      </header>

      <section className="container mx-auto">
        <SurahListShimmer />
      </section>
    </main>
  );
}
