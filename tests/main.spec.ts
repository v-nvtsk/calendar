import { expect, test } from "@playwright/test";
import { AuthPageObject } from "../testObjectModels/authPageModel";
import { baseURL } from "./url";

// const baseURL = "http://localhost:3000";

test.describe("main", async () => {
  test("interface", async ({ page }) => {
    await page.goto(`${baseURL}/`);
    await expect(page.getByRole("heading", { name: '"Календарь событий с авторизацией"' })).toBeVisible();

    await page.getByRole("link", { name: "About" }).click();
    expect(page.getByRole("heading", { name: '"Календарь событий с авторизацией"' })).toBeVisible();

    await page.getByRole("link", { name: "Sign Up", exact: true }).click();
    expect(page.getByRole("heading", { name: "Sign up" })).toBeVisible();

    await page.getByRole("link", { name: "Calendar" }).click();
    expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
    const authPage = new AuthPageObject(page);
    await authPage.authenticate();
    await expect(page.getByRole("heading", { name: /calendar/i })).toBeVisible();

    await page.getByRole("link", { name: "Profile" }).click();
    await expect(page.getByRole("navigation")).toContainText("Profile");
  });
});
