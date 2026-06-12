import { expect, test, type Page } from "@playwright/test";
import { manageAndDeliverCommunityLogin } from "../../steps/auth/login";
import { getConfig } from "../../appConfig";

const appConfig = getConfig();

const groupId = process.env.E2E_SESSIONS_GROUP_ID || "55f54fa0-8213-4853-9e4b-cf3f94ceb7c0";

const routes = {
  groupDetails: `/group/${groupId}/group-details`,
  allocations: `/group/${groupId}/allocations`,
  waitlist: `/group/${groupId}/waitlist`,
  scheduleOverview: `/group/${groupId}/schedule-overview`,
  sessionsAndAttendance: `/group/${groupId}/sessions-and-attendance`,
};

const open = async (page: Page, path: string) => {
  const url = new URL(path, appConfig.MANAGE_AND_DELIVER_URL).toString();
  await page.goto(url);
};

const verifySecondaryTabsVisible = async (page: Page) => {
  await expect(page.locator(`main a[href="${routes.groupDetails}"]`).first()).toBeVisible();
  await expect(page.locator(`main a[href="${routes.allocations}"]`).first()).toBeVisible();
  await expect(page.locator(`main a[href="${routes.scheduleOverview}"]`).first()).toBeVisible();
  await expect(page.locator(`main a[href="${routes.sessionsAndAttendance}"]`).first()).toBeVisible();
};

const verifyTableHasDataOrEmptyState = async (page: Page) => {
  const rowCount = await page.locator("tbody tr").count();
  if (rowCount > 0) {
    expect(rowCount).toBeGreaterThan(0);
    return;
  }

  await expect(
    page.getByText(/no results|no .* found|there are no/i).first()
  ).toBeVisible();
};

test.describe("Group pages - secondary tabs and allocations sub-tabs", () => {
  test("Navigates all 4 tabs and validates nested Allocated/Waitlist content", async ({ page }) => {
    await test.step("1. Sign in", async () => {
      await manageAndDeliverCommunityLogin(page);
    });

    await test.step("2. Group details tab loads and contains details", async () => {
      await open(page, routes.groupDetails);
      await expect(page).toHaveURL(new RegExp(routes.groupDetails));
      await expect(page.getByRole("heading", { name: "Group details" })).toBeVisible();
      await verifySecondaryTabsVisible(page);
      await expect(page.getByText(/Group code|Cohort|Sex|PDU|Delivery location/i).first()).toBeVisible();
    });

    await test.step("3. Allocations tab loads and Allocated sub-tab has data or empty state", async () => {
      await open(page, routes.allocations);
      await expect(page).toHaveURL(new RegExp(routes.allocations));
      await expect(page.getByRole("heading", { name: "Allocations and waitlist" })).toBeVisible();
      await verifySecondaryTabsVisible(page);

      const allocatedTab = page.getByRole("link", { name: /Allocated \(\d+\)/i });
      await expect(allocatedTab).toBeVisible();
      await expect(allocatedTab).toHaveAttribute("aria-current", "page");
      await verifyTableHasDataOrEmptyState(page);
    });

    await test.step("4. Waitlist sub-tab loads and has data or empty state", async () => {
      const waitlistTab = page.getByRole("link", { name: /Waitlist \(\d+\)/i });
      await expect(waitlistTab).toBeVisible();
      await waitlistTab.click();

      await expect(page).toHaveURL(new RegExp(routes.waitlist));
      await expect(waitlistTab).toHaveAttribute("aria-current", "page");
      await verifyTableHasDataOrEmptyState(page);
    });

    await test.step("5. Schedule overview tab loads and contains schedule data", async () => {
      await open(page, routes.scheduleOverview);
      await expect(page).toHaveURL(new RegExp(routes.scheduleOverview));
      await expect(page.getByRole("heading", { name: "Schedule overview" })).toBeVisible();
      await verifySecondaryTabsVisible(page);
      await expect(page.getByText(/Session|Date|Time/i).first()).toBeVisible();
      await verifyTableHasDataOrEmptyState(page);
    });

    await test.step("6. Sessions and attendance tab loads and contains section data", async () => {
      await open(page, routes.sessionsAndAttendance);
      await expect(page).toHaveURL(new RegExp(routes.sessionsAndAttendance));
      await expect(page.getByRole("heading", { name: "Sessions and attendance" })).toBeVisible();
      await verifySecondaryTabsVisible(page);
      await expect(page.locator("main h2 button").first()).toBeVisible();
      const sectionCount = await page.locator("main h2 button").count();
      expect(sectionCount).toBeGreaterThan(0);
    });
  });
});
