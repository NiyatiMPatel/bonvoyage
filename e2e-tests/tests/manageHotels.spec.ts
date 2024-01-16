import { test, expect } from "@playwright/test";
import path from "path";

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

// ============= ADD HOTEL TEST ================ //
test("should allow user to add a hotel", async ({ page }) => {
  // NAVIGATE TO ADD HOTEL PAGE
  await page.goto(`${UI_URL}add-hotel`);

  // FILL IN THE ADD HOTEL FORM
  await page.locator('[name="name"]').fill("Radissons");
  await page.locator('[name="city"]').fill("Califonia");
  await page.locator('[name="country"]').fill("America");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the Radissons");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  // NOTIFY IF HOTEL CREATED SUCCESSFULLY
  await expect(page.getByText("Created new hotel Successfully!")).toBeVisible();
});

// ================= READ ALL MY HOTELS ================ //
test("should display hotels", async ({ page }) => {
  // NAVIGATE TO MY HOTELS PAGE
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("Radissons").first()).toBeVisible();
  await expect(
    page.getByText("This is a description for the Radissons")
  ).toBeVisible();
  await expect(page.getByText("Califonia, America")).toBeVisible();
  await expect(page.getByText("Budget")).toBeVisible();
  await expect(page.getByText("$100 per night")).toBeVisible();
  await expect(page.getByText("2 adults, 4 children")).toBeVisible();
  await expect(page.getByText("3 Star Rating")).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});
