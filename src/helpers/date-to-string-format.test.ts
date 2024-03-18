import { dateToStringWithFormat } from "./date-to-string-format";

describe("dateToStringWithFormat", () => {
  const testData = [
    { name: "year", year: 2024, expectedResult: "2024" },
    { name: "month", year: 2024, month: 0, expectedResult: "January 2024" },
    { name: "month", year: 2024, month: 6, expectedResult: "July 2024" },
    { name: "month", year: 2024, month: 11, expectedResult: "December 2024" },
    { name: "date", year: 2024, month: 1, date: 1, expectedResult: "February 1, 2024" },
    { name: "date", year: 2024, month: 6, date: 31, expectedResult: "July 31, 2024" },
    { name: "date", year: 2024, month: 11, date: 1, expectedResult: "December 1, 2024" },
    { name: "list", year: 2024, month: 1, date: 1, expectedResult: "" },
    { name: "task", year: 2024, month: 1, date: 1, expectedResult: "" },
    { name: "year", expectedResult: String(new Date().getFullYear()) },
    { name: "any", expectedResult: "" },
  ];

  it("should return expected value", () => {
    testData.forEach(({ name, year, month, date, expectedResult }) => {
      const result = dateToStringWithFormat({ name, year, month, date });
      expect(result).toEqual(expectedResult);
    });
  });
});
