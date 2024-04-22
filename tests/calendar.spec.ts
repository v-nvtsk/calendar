import { test } from "@playwright/test";
import { getCurrentWeekNumber, getTodayAsObject } from "../src/helpers";
import { AuthPageObject } from "../testObjectModels/authPageModel";
import { CalendarPageObject, calendarBaseURL } from "../testObjectModels/calendarPageModel";
import { baseURL } from "./url";

test.describe("Calendar", async () => {
  let calendarPage: CalendarPageObject;

  const todayObj = getTodayAsObject();
  const currentWeek = getCurrentWeekNumber()[1];
  const testViews = [
    {
      name: "year",
      next: `/year?year=${todayObj.year + 1}`,
      prev: `/year?year=${todayObj.year - 1}`,
      today: `/year?year=${todayObj.year}`,
    },
    {
      name: "month",
      next: `/month?year=${todayObj.year}&month=${todayObj.month + 1}`,
      prev: `/month?year=${todayObj.year}&month=${todayObj.month - 1}`,
      today: `/month?year=${todayObj.year}&month=${todayObj.month}`,
    },
    {
      name: "week",
      next: `/week?year=${todayObj.year}&week=${currentWeek + 1}`,
      prev: `/week?year=${todayObj.year}&week=${currentWeek - 1}`,
      today: `/week?year=${todayObj.year}&week=${currentWeek}`,
    },
    {
      name: "date",
      next: `/date?year=${todayObj.year}&month=${todayObj.month}&date=${todayObj.date + 1}`,
      prev: `/date?year=${todayObj.year}&month=${todayObj.month}&date=${todayObj.date - 1}`,
      today: `/date?year=${todayObj.year}&month=${todayObj.month}&date=${todayObj.date}`,
    },
  ];

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

  testViews.map((view) =>
    test(`calendar view ${view.name}`, async () => {
      const page = calendarPage.getPage();
      await test.step(`open ${view.name} view`, async () => {
        await calendarPage.changeView(view.name);
        await page.waitForURL(`${calendarBaseURL}${view.today}`);
        await page.waitForURL(`${calendarBaseURL}${view.today}`);
      });

      await test.step(`goto next ${view.name}`, async () => {
        await calendarPage.goNext();
        await page.waitForURL(`${calendarBaseURL}${view.next}`);
        await page.waitForURL(`${calendarBaseURL}${view.next}`);
      });

      await test.step(`open previous ${view.name}`, async () => {
        await calendarPage.goPrev();
        await calendarPage.goPrev();
        await page.waitForURL(`${calendarBaseURL}${view.prev}`);
        await page.waitForURL(`${calendarBaseURL}${view.prev}`);
      });

      await test.step(`goto current ${view.name}`, async () => {
        await calendarPage.goToday();
        await page.waitForURL(`${calendarBaseURL}${view.today}`);
        await page.waitForURL(`${calendarBaseURL}${view.today}`);
      });
    }),
  );
});
