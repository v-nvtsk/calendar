import { getFilterForView } from ".";

describe("generatePathname", () => {
  it("should return correct path", () => {
    expect(getFilterForView({ newView: "year", year: 2024, month: 0, date: 1 })).toEqual({
      dateFrom: new Date(2024, 0, 1).setHours(0, 0, 0, 0).valueOf(),
      dateTo: new Date(2024, 11, 31).setHours(0, 0, 0, 0).valueOf(),
    });

    expect(getFilterForView({ newView: "month", year: 2024, month: 0, date: 1 })).toEqual({
      dateFrom: new Date(2024, 0, 1).setHours(0, 0, 0, 0).valueOf(),
      dateTo: new Date(2024, 1, 0).setHours(0, 0, 0, 0).valueOf(),
    });

    expect(getFilterForView({ newView: "date", year: 2024, month: 0, date: 1 })).toEqual({
      dateFrom: new Date(2024, 0, 1).setHours(0, 0, 0, 0).valueOf(),
      dateTo: new Date(2024, 0, 2).setHours(0, 0, 0, 0).valueOf(),
    });
    expect(getFilterForView({ newView: "list", year: 2026, month: 0, date: 1 })).toEqual({
      dateFrom: new Date().setHours(0, 0, 0, 0).valueOf(),
    });
    expect(getFilterForView({ newView: "fault", year: 2024, month: 0, date: 1 })).toEqual({});
  });
});
