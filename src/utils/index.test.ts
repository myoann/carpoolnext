import {
  convertSeconds,
  currencySymbol,
  formatDate,
  parseCoordinate,
} from "./";

describe("utils", () => {
  describe("convertSeconds", () => {
    it("converts seconds to HHhMM format", () => {
      expect(convertSeconds(3600)).toBe("1h00");
      expect(convertSeconds(3660)).toBe("1h01");
      expect(convertSeconds(3720)).toBe("1h02");
      expect(convertSeconds(7200)).toBe("2h00");
      expect(convertSeconds(7260)).toBe("2h01");
      expect(convertSeconds(7320)).toBe("2h02");
    });
  });

  describe("currencySymbol", () => {
    it("returns the correct symbol for the currency", () => {
      expect(currencySymbol("EUR")).toBe("€");
      expect(currencySymbol("GBP")).toBe("£");
      expect(currencySymbol("USD")).toBe("$");
      expect(currencySymbol("JPY")).toBe("JPY");
    });
  });

  describe("formatDate", () => {
    it("formats a date string into a human readable format", () => {
      expect(formatDate("2021-01-01")).toBe("January 1");
      expect(formatDate("2021-01-02")).toBe("January 2");
    });
  });

  describe("parseCoordinate", () => {
    it("parses a coordinate string into an object with lat and lng", () => {
      expect(parseCoordinate("48.8566,2.3522")).toEqual({
        lat: 48.8566,
        lng: 2.3522,
      });
      expect(parseCoordinate("51.5074, 0.1278")).toEqual({
        lat: 51.5074,
        lng: 0.1278,
      });
    });
  });
});
