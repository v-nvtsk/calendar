import type { Page } from "@playwright/test";
import { baseURL } from "../tests/url";

export const calendarBaseURL = `${baseURL}calendar`;

export class CalendarPageObject {
  constructor(private page: Page) {}

  getPage() {
    if (this.page) return this.page;
    throw new Error("Page object not found");
  }

  async open(view: string = "year") {
    await this.page.goto(`${calendarBaseURL}/${view}`);
  }

  async addTask(title: string, description: string, date: string, tags: string) {
    const group = this.page.getByRole("group", { name: /add task/i });
    await group.getByRole("textbox", { name: /title:/i }).fill(title);
    await group.getByRole("textbox", { name: /task description:/i }).fill(description);
    await group.getByLabel("Event date and time:").fill(date);
    await group.getByPlaceholder("Enter comma separated tags").fill(tags);
    await this.page.getByRole("button", { name: "Add", exact: true }).click();
    await this.waitDataLoading();
  }

  async changeView(view: string) {
    await this.page
      .locator("#root div")
      .filter({ hasText: /yearmonthweekdatelist/ })
      .getByRole("combobox")
      .selectOption(view);
  }

  async goNext() {
    await this.page.locator('button[name="nextArrow"]').click();
  }

  async goPrev() {
    await this.page.locator('button[name="prevArrow"]').click();
  }

  async goToday() {
    await this.page.getByRole("button", { name: "Today" }).click();
  }

  async selectYear(year: number) {
    await this.page.goto(`${calendarBaseURL}/year?year=${year}`);
    await this.page.waitForURL(`${calendarBaseURL}/year?year=${year}`);
  }

  async selectMonth(month: string, year: number = new Date().getFullYear()) {
    await this.page.goto(`${calendarBaseURL}/month?year=${year}&month=${month}`);
    await this.page.getByRole("link", { name: month }).click();
  }

  async selectDate(year: number, month: number, date: number) {
    await this.page
      .locator(
        `.page__calendar .year .year__month:nth-child(${month}) .year__month-day[data-date='${new Date(year, month - 1, date).getTime()}']`,
      )
      .click();
  }

  async waitDataLoading() {
    await this.page.locator(".page__calendar.loading").waitFor({ state: "attached" });
    await this.page.locator(".page__calendar.loading").waitFor({ state: "detached" });
  }
}
