import type { Page } from "@playwright/test";

const baseURL = "http://localhost:3000/calendar";

export class CalendarPageObject {
  constructor(private page: Page) {}

  getPage() {
    if (this.page) return this.page;
    throw new Error("Page object not found");
  }

  async open(view: string = "year") {
    await this.page.goto(`${baseURL}/${view}`);
  }

  async addTask(title: string, description: string, date: string, tags: string) {
    await this.page.getByPlaceholder("Enter task title...").fill(title);
    await this.page.getByPlaceholder("Enter task description...").fill(description);
    await this.page.getByLabel("Event date and time:").fill(date);
    await this.page.getByPlaceholder("Enter comma separated tags").fill(tags);
    await this.page.getByRole("button", { name: "Add" }).click();
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

  async selectMonth(month: string, year: number = new Date().getFullYear()) {
    await this.page.goto(`${baseURL}/calendar/month?year=${year}&month=${month}`);
    await this.page.getByRole("link", { name: month }).click();
  }

  async selectDate(month: number, date: number) {
    this.page.locator(`div:nth-child(${month}) > .year__month-days > a[href$="date=${date}"]`).click();
    // http://localhost:3000/calendar/date?year=2024&month=1&date=15
  }
}
