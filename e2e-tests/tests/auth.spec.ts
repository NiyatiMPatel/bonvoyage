import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";
const testEmail = `test_register_${
  Math.floor(Math.random() * 90000) + 10000
}@test.com`;

// ============= SIGN IN TEST ============== //
// NAVIGATE TO A PAGE, DO SOME STUFFS
test("should allow the user to sign in", async ({ page }) => {
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
  // CHECK IF HEADER LINKS AND SIGN OUT BUTTON APPEARS AFTER SUCCESSFUL LOGIN
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

// ============= REGISTER USER TEST ===============//
// NAVIGATE TO A PAGE, DO SOME STUFFS
test("should allow user to register", async ({ page }) => {
  // NAVIGATE TO HOME PAGE
  await page.goto(UI_URL);
  // DO THE ASSERTIONS TO CHECK IF SOMETHING IS VALID OR NOT
  // GET THE SIGN IN BUTTON AND CLICK ON SIGN IN BUTTON
  await page.getByRole("link", { name: "Sign In" }).click();
  // CHECK IF CREATE AN ACCOUNT LINK IS PRESENT AND CLICK IT
  await page.getByRole("link", { name: "Create an account here" }).click();
  // ASSERT THAT REDIRECTED TO CREATE ACCOUNT PAGE - CHECK "CREATE AN ACCOUNT" HEADER IS PRESENT
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();
  // FILL IN THE REGISTER FORM
  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail); // GENERATE RANDOM UNIQUE EMAIL SO THAT TEST DOESNT FAIL WITH USER ALREADY EXISTS
  await page.locator("[name=password]").fill("testPassword");
  await page.locator("[name=confirmPassword]").fill("testPassword");
  // GET THE SIGN IN BUTTON AND CLICK ON SIGN IN BUTTON
  await page.getByRole("button", { name: "Create Account" }).click();
  // NOTIFY IF USER SUCCESSFULLY SIGNED IN
  await expect(page.getByText("User registered successfully")).toBeVisible();
  // CHECK IF HEADER LINKS AND SIGN OUT BUTTON APPEARS AFTER SUCCESSFUL LOGIN
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
