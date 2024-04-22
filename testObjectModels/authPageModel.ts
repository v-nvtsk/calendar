import type { Page } from "@playwright/test";
import { baseURL } from "../tests/url";

const testEmail = "test@test.test";
const testPassword = "123456";

export class AuthPageObject {
  constructor(private page: Page) {}

  getPage() {
    if (this.page) return this.page;
    throw new Error("Page object not found");
  }

  async open() {
    await this.page.goto(`${baseURL}/auth/signin`);
  }

  async authenticate() {
    await this.open();
    await this.fillEmail();
    await this.fillPassword();
    await this.submitSignIn();
  }

  async fillEmail(email: string = testEmail) {
    await this.page.getByPlaceholder("Email").fill(email);
  }

  async fillPassword(password: string = testPassword) {
    await this.page.getByPlaceholder("Password").fill(password);
  }

  async submitSignIn() {
    await this.page.getByRole("button", { name: "Sign in" }).click();
  }

  async goToSignup() {
    await this.page.getByRole("link", { name: "Sign Up", exact: true }).click();
  }

  async submitSignUp() {
    await this.page.getByRole("button", { name: "Sign Up" }).click();
  }

  async goToRecoverPassword() {
    await this.page.getByRole("link", { name: "Forgot password?" }).click();
  }

  async submitRecover() {
    await this.page.getByRole("button", { name: "Recover" }).click();
  }
}
