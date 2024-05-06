import { expect, test } from "@playwright/test";
import { TodoItem } from "../../src/api/calendar.types";
import { AuthPageObject } from "../../testObjectModels/authPageModel";
import { CalendarPageObject } from "../../testObjectModels/calendarPageModel";
import { baseURL } from "../url";

test.describe("Calendar", async () => {
  let calendarPage: CalendarPageObject;

  test.beforeEach(async ({ page }) => {
    const authPage = new AuthPageObject(page);
    const email = "test@test.test";
    const password = "123456";
    await authPage.open();
    await authPage.fillEmail(email);
    await authPage.fillPassword(password);
    await authPage.submitSignIn();
    await page.waitForURL(baseURL);
    calendarPage = new CalendarPageObject(page);
    await calendarPage.open();
  });

  test("should add new task", async () => {
    const page = calendarPage.getPage();
    const random = (start: number, end: number) => Math.floor(Math.random() * (end - start + 1)) + start;
    const year = random(2020, 2024);
    const month = random(1, 12);
    const date = random(1, 31);
    const startDate = `${year}-${String(month).padStart(2, "0")}-${String(date).padStart(2, "0")}T00:00`;

    const task: Partial<TodoItem> = {
      taskTitle: `test task for date: ${startDate} ${Math.floor(Math.random() * 100000).toString()}`,
      description: "test task description ",
      tags: "test tags, separated with comma",
    };

    await calendarPage.addTask(task.taskTitle!, task.description!, startDate, task.tags!);
    await calendarPage.selectYear(year);
    await calendarPage.selectDate(year, month, date);
    await page.locator(".page__calendar.loading").waitFor({ state: "attached" });
    await page.locator(".page__calendar.loading").waitFor({ state: "detached" });
    await page.getByText(task.taskTitle!).waitFor({ state: "attached" });
    await expect(page.getByText(task.taskTitle!)).toBeVisible();
  });
});
