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

/** Utility function to check if the device has a max-width of 768px and if the orientation is portrait */
export const isMobileDevice = (): boolean => {
  return typeof window !== "undefined"
    ? window.matchMedia("(max-width: 768px) and (orientation: portrait)")
        .matches
    : false;
};
