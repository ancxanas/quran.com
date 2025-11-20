import SurahList from "./components/SurahList/SurahList";
import HeaderIcon from "../public/icons/header.svg";
import { getSurahList } from "./lib/quran-api";

export default async function Home() {
  let initialSurahs;

  try {
    initialSurahs = await getSurahList();
  } catch (error) {
    console.error("Failed to load surahs", error);
    throw new Error("Failed to fetch Surahs");
  }

  return (
    <main className="p-6">
      <header className="mb-8 flex justify-center text-text-primary">
        <HeaderIcon className="w-96 h-48" aria-hidden="true" focusable="false" />

        <h1 id="site-title" className="sr-only">
          Al Qur'an Kareem
        </h1>
      </header>

      <section aria-label="Qur’an Surah List" className="container mx-auto">
        <SurahList initialSurahs={initialSurahs} />
      </section>
    </main>
  );
}
