import SurahList from "./components/SurahList";
import HeaderIcon from "../public/icons/header.svg";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/chapters", {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch surahs");
  }

  const { data: initialSurahs } = await response.json();

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
