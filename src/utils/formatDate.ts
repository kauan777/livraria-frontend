export function formatDate(date: string): string {
  const dateInstance = new Date(date);

  const dateFormated = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(dateInstance);

  return `${dateFormated}`;
}
