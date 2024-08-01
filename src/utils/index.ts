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

// Regex for latitude and longitude, used to validate coordinates
const regexLatitude = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
const regexLongitude =
  /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

/* Validate a coordinate (latitude, longitude) */
export const validateCoordinates = (coordinate: string): boolean => {
  const latitude = coordinate?.split(",")[0];
  const longitude = coordinate?.split(",")[1];

  let validLatitude = regexLatitude.test(latitude);
  let validLongitude = regexLongitude.test(longitude);

  return validLatitude && validLongitude;
};
