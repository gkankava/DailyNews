export const renderTitle = (title: string | undefined | null): string | undefined => {
    if (!title) return ""
    const parts = title.split(' - ');
    if (parts.length > 1) {
        return parts.slice(0, -1).join(' - ').trim();
    }
    return title.trim();
  };

export const renderDate = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  };

export const renderDomain = (url: string): string => {
  try {
    return new URL(url).host;
  } catch {
    return "";
  }
  };