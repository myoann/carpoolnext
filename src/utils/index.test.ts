import { convertSeconds, currencySymbol } from "./";

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
});
