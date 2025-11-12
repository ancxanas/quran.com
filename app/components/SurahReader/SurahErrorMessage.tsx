interface SurahErrorMessageProps {
  message?: string
}

export function SurahErrorMessage({
  message = "Error loading verses. Please try again later.",
}: SurahErrorMessageProps) {
  return (
    <section role="alert" className="mushaf-error">
      <p>{message}</p>
    </section>
  )
}
