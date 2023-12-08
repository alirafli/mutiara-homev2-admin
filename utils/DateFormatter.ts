export const formatDate = (
  dateString: string,
  month: "short" | "long" = "short"
): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month,
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};
