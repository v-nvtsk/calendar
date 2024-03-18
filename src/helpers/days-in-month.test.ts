import { daysInMonth } from "./days-in-month";

describe("daysInMonth", () => {
  const testData = [
    { input: { year: 2024, month: 0 }, expectedValue: 31 },
    { input: { year: 2024, month: 1 }, expectedValue: 29 },
    { input: { year: 2024, month: 2 }, expectedValue: 31 },
    { input: { year: 2024, month: 3 }, expectedValue: 30 },
    { input: { year: 2024, month: 4 }, expectedValue: 31 },
    { input: { year: 2024, month: 5 }, expectedValue: 30 },
    { input: { year: 2024, month: 6 }, expectedValue: 31 },
    { input: { year: 2024, month: 7 }, expectedValue: 31 },
    { input: { year: 2024, month: 8 }, expectedValue: 30 },
    { input: { year: 2024, month: 9 }, expectedValue: 31 },
    { input: { year: 2024, month: 10 }, expectedValue: 30 },
    { input: { year: 2024, month: 11 }, expectedValue: 31 },
  ];

  it("should return expected value", () => {
    testData.forEach(({ input, expectedValue }) => {
      const result = daysInMonth(input.month, input.year);
      expect(result).toBe(expectedValue);
    });
  });
});
