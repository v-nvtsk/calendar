import { generatePathname } from "./generate-pathname";

describe("generatePathname", () => {
  it("should return correct path", () => {
    const testData = { newView: "", year: 2024, month: 0, date: 1, id: "testId" };

    expect(generatePathname({ ...testData, newView: "year" })).toBe("/calendar/year?year=2024");
    expect(generatePathname({ ...testData, newView: "month" })).toBe("/calendar/month?year=2024&month=0");
    expect(generatePathname({ ...testData, newView: "date" })).toBe("/calendar/date?year=2024&month=0&date=1");
    expect(generatePathname({ ...testData, newView: "week" })).toBe("/calendar/week?year=2024&month=0&date=1");
    expect(generatePathname({ ...testData, newView: "list" })).toBe("/calendar/list?year=2024&month=0&date=1");
    expect(generatePathname({ ...testData, newView: "task" })).toBe("/../task?id=testId");
  });
});
