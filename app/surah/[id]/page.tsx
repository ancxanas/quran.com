import { SurahReader } from "@/app/components/SurahReader";

interface SurahPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const surahs = Array.from({ length: 114 }, (_, i) => i + 1);

  return surahs.map((id) => ({
    id: id.toString(),
  }));
}

export default async function SurahPage({ params }: SurahPageProps) {
  const { id } = await params;
  const chapterId = parseInt(id, 10);

  if (isNaN(chapterId) || chapterId < 1 || chapterId > 114) {
    return <div className="text-center text-red-500 p-8">Invalid Surah</div>;
  }

  return <SurahReader chapterId={chapterId} />;
}
