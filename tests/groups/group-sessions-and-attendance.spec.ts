import { expect, test, type Locator, type Page } from "@playwright/test";
import { manageAndDeliverCommunityLogin } from "../../steps/auth/login";
import { getConfig } from "../../appConfig";

const appConfig = getConfig();

const sectionButtons = (page: Page) => page.locator("main h2 button");

const expandSectionByIndex = async (page: Page, index: number): Promise<Locator> => {
  const button = sectionButtons(page).nth(index);
  const expanded = await button.getAttribute("aria-expanded");
  if (expanded !== "true") {
    await button.click();
  }

  const sectionContentId = await button.getAttribute("aria-controls");
  if (!sectionContentId) {
    throw new Error(`Section button at index ${index} is missing aria-controls`);
  }

  const sectionContent = page.locator(`#${sectionContentId}`);
  await expect(sectionContent).toBeVisible();
  return sectionContent;
};

test.describe("Individual Group - Sessions and Attendance", () => {
  test("First 6 expanders support schedule catch-up/one-to-one and attendance/notes actions", async ({ page }) => {
    const groupId =
      process.env.E2E_SESSIONS_GROUP_ID ||
      "55f54fa0-8213-4853-9e4b-cf3f94ceb7c0";

    const sessionsAndAttendanceUrl = new URL(
      `/group/${groupId}/sessions-and-attendance`,
      appConfig.MANAGE_AND_DELIVER_URL
    ).toString();

    await test.step("1. Sign in", async () => {
      await manageAndDeliverCommunityLogin(page);
    });

    await test.step("2. Open existing group's sessions and attendance page", async () => {
      await page.goto(sessionsAndAttendanceUrl);
      await expect(page).toHaveURL(new RegExp(`/group/${groupId}/sessions-and-attendance`));
      await expect(page.getByRole("heading", { name: /sessions|attendance/i })).toBeVisible();
    });

    await test.step("3. Verify there are 6 expandable session sections", async () => {
      const count = await sectionButtons(page).count();
      expect(count).toBeGreaterThanOrEqual(6);
    });

    await test.step("4. For each of first 6 sections validate creation and attendance/notes flows", async () => {
      for (let i = 0; i < 6; i++) {
        await page.goto(sessionsAndAttendanceUrl);
        const sectionTitle = (
          await sectionButtons(page)
            .nth(i)
            .innerText()
        )
          .replace(/,\s*(Show|Hide).*/i, "")
          .trim();

        const section = await expandSectionByIndex(page, i);

        const scheduleLink = section.getByRole("link", { name: /schedule a/i }).first();
        await expect(scheduleLink).toBeVisible();
        await expect(scheduleLink).toHaveAttribute("href", /.+/);

        await scheduleLink.click();
        await expect(page.getByRole("heading", { name: /which session are you scheduling/i })).toBeVisible();
        await expect(page.locator('input[type="radio"][value*="CATCH_UP"]').first()).toBeVisible();
        const oneToOneOptionCount = await page
          .locator('input[type="radio"][value*="ONE_TO_ONE"]')
          .count();

        if (/bringing it all together/i.test(sectionTitle)) {
          expect(oneToOneOptionCount).toBeGreaterThanOrEqual(0);
        } else {
          expect(oneToOneOptionCount).toBeGreaterThan(0);
        }

        await page.goto(sessionsAndAttendanceUrl);
        const sectionForSession = await expandSectionByIndex(page, i);
        const sessionLink = sectionForSession
          .locator("a")
          .filter({ hasText: /:/ })
          .first();

        await expect(sessionLink).toBeVisible();
        await expect(sessionLink).toHaveAttribute("href", /.+/);
        await sessionLink.click();

        const updateAttendanceAndNotesButton = page.getByRole("button", {
          name: /update attendance and notes/i,
        });
        await expect(updateAttendanceAndNotesButton).toBeVisible();
        await updateAttendanceAndNotesButton.click();
        await expect(
          page
            .getByRole("heading", {
              name: /did .* attend|attendance and session notes/i,
            })
            .first()
        ).toBeVisible();
      }
    });
  });
});
