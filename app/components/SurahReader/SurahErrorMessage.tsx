interface SurahErrorMessageProps {
  message?: string;
}

export function SurahErrorMessage({
  message = "Error loading verses. Please try again later.",
}: SurahErrorMessageProps) {
  return (
    <section role="alert" className="p-4 text-red-600 text-center">
      <p>{message}</p>
    </section>
  );
}
