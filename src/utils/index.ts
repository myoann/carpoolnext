/** Convert a duration in seconds to a HHhMM format */
export const convertSeconds = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours}h${minutes < 10 ? "0" : ""}${minutes}`;
};

/** Convert a currency with a ISO_4217 format to a symbol */
export const currencySymbol = (currency: string) => {
  switch (currency) {
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "USD":
      return "$";
    default:
      return currency;
  }
};

/** Format a date string into a human readable format */
export const formatDate = (date: string) => {
  const formattedDate = new Date(date);

  return formattedDate.toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
};

/** Parse a coordinate string into an object with lat and lng */
export const parseCoordinate = (coordinate: string) => {
  const [lat, lng] = coordinate.split(",").map(parseFloat);
  return { lat, lng };
};
