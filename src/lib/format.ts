export function levelColor(level: string): string {
  switch (level) {
    case "emergency":
      return "#9b1c1c";
    case "alarm":
      return "#c2410c";
    case "alert":
      return "#b45309";
    case "watch":
      return "#1d4ed8";
    case "recovering":
      return "#047857";
    default:
      return "#44403c";
  }
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Nairobi",
  });
}

export function confidencePct(c: number): string {
  return `${Math.round(c * 100)}%`;
}
