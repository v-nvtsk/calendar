import { checkIsToday, getToday, getTodayAsObject } from "./dates";

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
