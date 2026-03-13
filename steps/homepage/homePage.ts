import { expect, type Page } from "@playwright/test";
import { getConfig } from "../../appConfig";

const appConfig = getConfig();

export const goToHomePage = async (page: Page) => {
  await page.goto(appConfig.MANAGE_AND_DELIVER_URL + "/");
  await expect(page).toHaveURL(/.*\/$/);
};

export const goToCaseListPageViaCard = async (page: Page) => {
  await goToHomePage(page);

  const caseListCard = page.locator('[data-test="case-list"]');
  await caseListCard.getByRole("link", { name: "Case list" }).click();

  await expect(page).toHaveURL(/.*\/pdu\/open-referrals$/);
};

export const goToCaseListPageViaNavLink = async (page: Page) => {
  await goToHomePage(page);

  const primaryNavigation = page.getByRole("navigation", {
    name: "Primary navigation",
  });
  await primaryNavigation.getByRole("link", { name: "Case list" }).click();

  await expect(page).toHaveURL(/.*\/pdu\/open-referrals$/);
};

export const goToGroupsListPageViaNavLink = async (page: Page) => {
  await goToHomePage(page);

  const primaryNavigation = page.getByRole("navigation", {
    name: "Primary navigation",
  });
  await primaryNavigation.getByRole("link", { name: "Groups" }).click();

  await expect(page).toHaveURL(/.*\/groups\/not-started-or-in-progress$/);
};

export const goToGroupsListPageViaCard = async (page: Page) => {
  await goToHomePage(page);

  const groupsCard = page.locator('[data-test="groups"]');
  await groupsCard.getByRole("link", { name: "Groups" }).click();

  await expect(page).toHaveURL(/.*\/groups\/not-started-or-in-progress$/);
};
 