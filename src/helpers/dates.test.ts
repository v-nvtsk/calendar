import { checkIsToday, getToday, getTodayAsObject, normalizeDate, printDate } from "./dates";

describe("Dates Helper", () => {
  describe("checkIsToday", () => {
    it("should return true for today", () => {
      const today = new Date();
      expect(checkIsToday(today)).toBe(true);
    });

    it("should accept object with year,month,date", () => {
      const today = getTodayAsObject();
      expect(checkIsToday(today)).toBe(true);
    });

    it("should return false for tomorrow", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(checkIsToday(tomorrow)).toBe(false);
    });
  });
});

describe("getToday", () => {
  it("should return today as number", () => {
    const today = getToday();
    expect(today).toBeDefined();
    expect(today).toEqual(new Date().setHours(0, 0, 0, 0));
  });
});

describe("getTodayAsObject", () => {
  it("should return today as object with year,month,date", () => {
    const today = getTodayAsObject();
    expect(today.year).toBeDefined();
    expect(today.year).toEqual(new Date().getFullYear());
    expect(today.month).toBeDefined();
    expect(today.month).toEqual(new Date().getMonth());
    expect(today.date).toBeDefined();
    expect(today.date).toEqual(new Date().getDate());
  });
});

describe("printDate", () => {
  it("should return date as dash separated string", () => {
    expect(printDate(new Date(2020, 0, 1))).toEqual("2020-01-01");
  });
});

describe("normalizeDate", () => {
  it("should return date as number", () => {
    const input = { year: 2024, month: 0, date: 32 };
    const result = { year: 2024, month: 1, date: 1 };

    expect(normalizeDate(input)).toEqual(result);
  });
});
