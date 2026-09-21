import type { NewsItem } from "./schema/metadata.schema";

export function sortNewsDescending(news: NewsItem[]): NewsItem[] {
  return [...news].sort((a, b) => b.date.localeCompare(a.date));
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});

export function formatNewsDate(isoDate: string): string {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00`));
}
