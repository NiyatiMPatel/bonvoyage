import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

// ============= SIGN IN TEST ============== //
// NAVIGATE TO A PAGE, DO SOME STUFFS
test.beforeEach(async ({ page }) => {
  // NAVIGATE TO HOME PAGE
  await page.goto(UI_URL);

  // DO THE ASSERTIONS TO CHECK IF SOMETHING IS VALID OR NOT
  // GET THE SIGN IN BUTTON AND CLICK ON SIGN IN BUTTON
  await page.getByRole("link", { name: "Sign In" }).click();
  // ASSERT THAT REDIRECTED TO SIGN IN PAGE - CHECK "SIGN IN" HEADER IS PRESENT
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  // FILL IN THE LOGIN FORM
  await page.locator("[name=email]").fill("harry@ymail.com");
  await page.locator("[name=password]").fill("Harry@1234");
  // GET THE SIGN IN BUTTON AND CLICK ON SIGN IN BUTTON
  await page.getByRole("button", { name: "Sign In" }).click();
  // NOTIFY IF USER SUCCESSFULLY SIGNED IN
  await expect(page.getByText("Login Successful")).toBeVisible();
});

//  =========== SEARCH HOTELS TEST ================= //
test("should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Califonia");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Hotels found in Califonia")).toBeVisible();
  await expect(page.getByText("Radissons").first()).toBeVisible();
});
